import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { toast } from "sonner"
import { getDate } from "@/utils"

type ResponseType = InferResponseType<typeof client.api.tasks["bulk-update"]["$post"], 200>
type RequestType = InferRequestType<typeof client.api.tasks["bulk-update"]["$post"]>

export const useBulkUpdateTasks = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ json }) => { 
      const response = await client.api.tasks["bulk-update"]["$post"]({ json })

      if (!response.ok) {
        throw new Error("Error while update task.")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast("Tarefa atualizada com sucesso.", {
        description: getDate(),
        action: {
          label: "Fechar",
          onClick: () => console.log("Undo")
        },
        style: {
          '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-blue-400), var(--color-blue-200)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-blue-400), var(--color-blue-200))',
          '--normal-border': 'light-dark(var(--color-blue-400), var(--color-blue-200))'
        } as React.CSSProperties
      })
      queryClient.invalidateQueries({ queryKey: ["project-analytics"] })
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] })
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
    onError: () => {
      toast.error("Oops, erro ao atualizar tarefa.", {
        style: {
          '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
          '--normal-text': 'var(--destructive)',
          '--normal-border': 'var(--destructive)'
        } as React.CSSProperties
      })
    }
  })

  return mutation
}
