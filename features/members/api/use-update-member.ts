import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { toast } from "sonner"
import { getDate } from "@/utils"

type ResponseType = InferResponseType<typeof client.api.members.application[":memberId"]["$patch"], 200>
type RequestType = InferRequestType<typeof client.api.members.application[":memberId"]["$patch"]>

export const useUpdateMember = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ param, json }) => { 
      const response = await client.api.members.application[":memberId"]["$patch"]({ param, json })

      if (!response.ok) {
        throw new Error("Error while update member.")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast("Membro atualizado com sucesso.", {
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
      queryClient.invalidateQueries({ queryKey: ["members"] })
    },
    onError: () => {
      toast.error("Oops, erro ao atualizar membro.", {
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
