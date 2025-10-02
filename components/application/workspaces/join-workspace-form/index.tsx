"use client"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useJoinWorkspace } from "@/features/workspaces/api/use-join-workspace"
import { useInviteCode } from "@/features/workspaces/hooks/use-invite-code"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridPattern } from "@/components/ui/grid-pattern"
import { useRouter } from "next/navigation"

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string
  }
}

export const JoinWorkspaceForm = ({ initialValues }: JoinWorkspaceFormProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const inviteCode = useInviteCode()
  const { mutate, isPending } = useJoinWorkspace()

  const onSubmit = () => {
    mutate({
      param: { workspaceId },
      json: { code: inviteCode }
    }, {
      onSuccess: ({ data }) => {
        router.push(`/workspaces/${data.$id}`)
      }
    })
  }

  return (
    <Card className="relative p-6 w-full h-full border-none rounded-md shadow-none bg-neutral-50">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] h-[130px]">
        <GridPattern />
      </div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl font-semibold">
          Juntar-se ao espaço de trabalho
        </CardTitle>
        <CardDescription className="text-base">
          Você foi convidado a juntar-se ao espaço de trabalho <strong>{initialValues.name}.</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex justify-end items-center gap-x-2">
          <Button
            disabled={isPending}
            type="button"
            variant="secondary"
            className="lg:w-[140px] h-10 text-base rounded-md cursor-pointer"
            asChild
          >
            <Link href="/application">
              Cancelar
            </Link>
          </Button>
          <Button
            disabled={isPending}
            type="button"
            variant="default"
            className="md:w-[240px] h-10 text-base rounded-md bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
            onClick={onSubmit}
          >
            Aceitar o convite
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}