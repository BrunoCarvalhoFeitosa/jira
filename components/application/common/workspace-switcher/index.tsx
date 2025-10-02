"use client"
import { useRouter } from "next/navigation"
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WorkspaceAvatar } from "../workspace-avatar"
import { RiAddCircleFill } from "react-icons/ri"
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal"

export const WorkspaceSwitcher = () => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { data: workspaces } = useGetWorkspaces()
  const { open } = useCreateWorkspaceModal()

  const onSelect = (id: string) => {
    router.push(`/workspaces/${id}`)
  }

  return (
    <div className="mt-12 pb-8 pr-4 flex flex-col gap-y-2 border-b">
      <div className="flex justify-between items-center">
        <h2 className="text-sm uppercase font-semibold text-neutral-500">
          Espaços de trabalho
        </h2>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer"
        />
      </div>
      {workspaces && workspaces?.total >= 1 && (
        <Select onValueChange={onSelect} value={workspaceId}>
          <SelectTrigger size="default" className="p-1 pl-2 w-full h-12 font-medium bg-neutral-100 border-neutral-300 focus-visible:border-neutral-300 focus-visible:ring-0 focus:outline-none cursor-pointer">
            <SelectValue placeholder="Nenhum espaço selecionado" />
          </SelectTrigger>
          <SelectContent>
            {workspaces?.documents.map((workspace) => (
              <SelectItem
                key={workspace.$id}
                value={workspace.$id}
              >
                <div>
                  <WorkspaceAvatar
                    name={workspace.name}
                    image={workspace.imageUrl}
                  />
                </div>
                {workspace.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
