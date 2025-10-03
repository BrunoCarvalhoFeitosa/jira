import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useDeleteTask } from "@/features/tasks/api/use-delete-task"
import { useEditTaskModal } from "@/features/tasks/hooks/use-edit-task-modal"
import { useConfirm } from "@/features/hooks/use-confirm"
import { Button } from "@/components/ui/button"
import { ProjectAvatar } from "../../common/project-avatar"
import { MemberAvatar } from "../../members/member-avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Project } from "@/features/projects/types"
import { getDate } from "@/utils"
import { Task } from "@/features/tasks/types"
import { ChevronRightIcon, Trash2Icon, EyeIcon, PencilIcon } from "lucide-react"
import { CgLockUnlock } from "react-icons/cg"
import { HiOutlineLink } from "react-icons/hi"
import { Member } from "@/features/members/types"

interface TaskBreadcrumbsProps {
  project: Project
  task: Task
}

export const TaskBreadcrumbs = ({ project, task }: TaskBreadcrumbsProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { data: members } = useGetMembers({ workspaceId })
  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask()
  const { open } = useEditTaskModal()

  const memberOptions = members?.documents.map((member: Member) => ({
    id: member.$id,
    name: member.name,
  }))

  const [ConfirmDialog, confirm] = useConfirm(
    "Deletar tafefa",
    "Esta ação é irreversível e não poderá ser desfeita, tem certeza que deseja prosseguir?"
  )

  const handleShareTask = () => {
    navigator.clipboard.writeText(`${window?.location?.href}`)
      .then(() => {
        toast("Link da página copiado com sucesso.", {
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
      })
  }

  const handleDeleteTask = async () => {
    const ok = await confirm()

    if (!ok) {
      return
    }

    deleteTask({ param: { taskId: task.$id } }, {
      onSuccess: () => {
        router.push(`/workspaces/${workspaceId}/tasks`)
      }
    })
  }

  return (
    <div>
      <ConfirmDialog />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project.name}
            image={project.imageUrl}
            className="size-8"
          />
          <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
            <p className="text-sm font-semibold lg:text-lg text-muted-foreground">
              {project.name}
            </p>
          </Link>
          <ChevronRightIcon className="hidden md:block size-4 text-muted-foreground" />
          <span className="hidden md:block font-semibold">
            {task.name}
          </span>
        </div>
        <div className="flex items-center gap-x-4">
          <Button
            disabled={isDeletingTask}
            variant="ghost"
            className="relative has-[>svg]:px-0 gap-1 hover:bg-transparent md:text-xs cursor-pointer"
          >
            <CgLockUnlock className="size-6 stroke-[0.12px]" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={isDeletingTask}
                variant="ghost"
                className="relative has-[>svg]:px-0 gap-1 hover:bg-transparent md:text-xs cursor-pointer"
              >
                <EyeIcon className="size-6" />
                <div className="absolute -right-2 -top-0.5 size-5 flex justify-center items-center rounded-full font-sans text-[11px] font-extrabold bg-neutral-200 dark:bg-blue-600 border border-neutral-400 dark:border-none">
                  {members?.total}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
              <ul className="flex flex-col gap-y-2">
                {memberOptions?.map((member) => (
                  <li key={member.id}>
                    <MemberAvatar
                      name={member.name}
                      className="size-5 text-xs"
                      showLabel
                      labelClassName="text-sm text-muted-foreground"
                    />
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
          <Button
            disabled={isDeletingTask}
            variant="ghost"
            className="has-[>svg]:px-0 hover:bg-transparent cursor-pointer"
            onClick={handleShareTask}
          >
            <HiOutlineLink className="size-6" />
          </Button>
          <Button
            disabled={isDeletingTask}
            variant="ghost"
            className="has-[>svg]:px-0 hover:bg-transparent cursor-pointer"
            onClick={() => open(task.$id)}
          >
            <PencilIcon className="size-5" />
          </Button>
          <Button
            disabled={isDeletingTask}
            variant="ghost"
            className="w-10 has-[>svg]:px-0 bg-neutral-100 dark:bg-red-500 dark:hover:bg-red-600 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={handleDeleteTask}
          >
            <Trash2Icon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}