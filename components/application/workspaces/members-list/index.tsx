"use client"
import { Fragment } from "react"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useUpdateMember } from "@/features/members/api/use-update-member"
import { useDeleteMember } from "@/features/members/api/use-delete-member"
import { useConfirm } from "@/features/hooks/use-confirm"
import { MemberRole } from "@/features/members/types"
import { MemberAvatar } from "../../members/member-avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HiArrowLongLeft } from "react-icons/hi2"
import { MoreVerticalIcon } from "lucide-react"
import { GridPattern } from "@/components/ui/grid-pattern"

export const MembersList = () => {
  const workspaceId = useWorkspaceId()
  const { data } = useGetMembers({ workspaceId })
  const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember()
  const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember()
  const router = useRouter()

  const [ConfirmDialog, confirm] = useConfirm(
    "Remover membro",
    "Este membro será removido do espaço de trabalho, tem certeza que deseja prosseguir?"
  )

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({
      json: { role },
      param: { memberId }
    })
  }

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm()

    if (!ok) {
      return
    }

    deleteMember({ param: { memberId } }, {
      onSuccess: () => {
        router.refresh()
      }
    })
  }

  return (
    <Card className="relative p-6 w-full h-full border-none shadow-none rounded-md bg-neutral-50 dark:bg-[#111]">
      <ConfirmDialog />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] h-[110px]">
        <GridPattern />
      </div>
      <CardHeader className="relative w-full flex flex-row items-center gap-x-4 z-10">
        <div className="w-full flex justify-between items-center">
          <div className="w-full flex items-center gap-3 flex-1">
            <Button
              variant="ghost"
              className="p-0 flex justify-center items-center w-10 h-10 bg-neutral-100 dark:bg-[#1A1A1A] rounded-full cursor-pointer"
              onClick={() => router.back()}
            >
              <HiArrowLongLeft className="w-5 h-5" />
            </Button>
            <CardTitle className="text-xl lg:text-3xl font-semibold">
              Membros
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative flex flex-col gap-y-4 z-10">
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar
                className="size-10"
                fallbackClassName="text-lg"
                name={member.name}
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold">
                  {member.name}
                </p>
                <p className="text-sm font-semibold text-muted-foreground">
                  {member.email}
                </p>
              </div>
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      className="ml-auto cursor-pointer"
                    >
                      <MoreVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col gap-y-1" side="bottom" align="end">
                    <DropdownMenuItem
                      disabled={isUpdatingMember}
                      className="font-semibold"
                      onClick={() => handleUpdateMember(member.$id, MemberRole.ADMIN)}
                    >
                      Definir como administrador
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      disabled={isUpdatingMember}
                      className="font-semibold"
                      onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)}
                    >
                      Definir como membro
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      disabled={isDeletingMember}
                      className="font-semibold text-red-500 hover:text-red-600 dark:hover:text-red-600"
                      onClick={() => handleDeleteMember(member.$id)}
                    >
                      Remover {member.name.split(" ")[0]}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {index < data.documents.length - 1 && (
              <div className="w-full h-[1px] bg-[#EFEFEF]" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  )
}