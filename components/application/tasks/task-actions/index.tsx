"use client"
import { useRouter } from "next/navigation"
import { useEditTaskModal } from "@/features/tasks/hooks/use-edit-task-modal"
import { useDeleteTask } from "@/features/tasks/api/use-delete-task"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useConfirm } from "@/features/hooks/use-confirm"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ExternalLinkIcon, PencilIcon, Trash2Icon } from "lucide-react"

interface TaskActionsProps {
  id: string
  projectId: string
  children: React.ReactNode
}

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const workspaceId = useWorkspaceId()
  const router = useRouter()
  const { open } = useEditTaskModal()
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()

  const [ConfirmDialog, confirm] = useConfirm(
    "Deletar tarefa",
    "Esta ação é irreversível e não poderá ser desfeita, tem certeza que deseja prosseguir?"
  )

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`)
  }
  
  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
  }

  const onDeleteTask = async () => {
    const ok = await confirm()

    if (!ok) {
      return
    }

    deleteTask({ param: { taskId: id } })
  }

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            disabled={false}
            className="p-[10px] flex items-center gap-x-2 font-semibold"
            onClick={onOpenProject}
          >
            <ExternalLinkIcon className="size-4 stroke-2" />
            Abrir projeto
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={false}
            className="p-[10px] flex items-center gap-x-2 font-semibold"
            onClick={onOpenTask}
          >
            <ExternalLinkIcon className="size-4 stroke-2" />
            Detalhes desta tarefa
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={false}
            className="p-[10px] flex items-center gap-x-2 font-semibold"
            onClick={() => open(id)}
          >
            <PencilIcon className="size-4 stroke-2" />
            Editar esta tarefa
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDeleting}
            className="p-[10px] flex items-center gap-x-2 font-semibold text-red-600 hover:text-red-600!"
            onClick={onDeleteTask}
          >
            <Trash2Icon className="size-4 stroke-2 text-red-600" />
            Deletar esta tarefa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
