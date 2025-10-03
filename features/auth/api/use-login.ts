import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { getDate } from "@/utils"
import { toast } from "sonner"

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>

export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ json }) => { 
      const response = await client.api.auth.login["$post"]({ json })

      if (!response.ok) {
        throw new Error("Error while login user.")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast("Autenticado com sucesso.", {
        description: getDate(),
        action: {
          label: "Fechar",
          onClick: () => console.log("Undo"),
        },
        style: {
          '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-blue-400), var(--color-blue-200)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-blue-400), var(--color-blue-200))',
          '--normal-border': 'light-dark(var(--color-blue-400), var(--color-blue-200))'
        } as React.CSSProperties
      })
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current"] })
    },
    onError: () => {
      toast.error("Oops, e-mail ou senha incorretos.", {
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
