import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { getDate } from "@/utils"
import { toast } from "sonner"

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error
  >({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]()

      if (!response.ok) {
        throw new Error("Error while logout user.")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast("Sucesso ao sair de sua conta.", {
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
      queryClient.invalidateQueries({ queryKey: ["current"] })
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    },
    onError: () => {
      toast.error("Oops, erro ao sair de sua conta.", {
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
