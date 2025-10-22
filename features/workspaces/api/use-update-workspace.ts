import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { toast } from "sonner"
import { getDate } from "@/utils"

type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$patch"], 200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$patch"]>

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ form, param }) => { 
      const response = await client.api.workspaces[":workspaceId"]["$patch"]({ form, param })

      if (!response.ok) {
        throw new Error("Error while update workspace.")
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast("Espaço de trabalho atualizado com sucesso.", {
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
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] })
    },
    onError: () => {
      toast.error("Oops, erro ao criar espaço de trabalho.", {
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
