"use client"
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal"
import { TaskStatus } from "@/features/tasks/types"
import { snakeCaseToTitleCase } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CircleCheckIcon, CircleDashedIcon, CircleDotDashedIcon, CircleDotIcon, CircleIcon, PlusIcon } from "lucide-react"

interface KanbanColumnHeaderProps {
  board: TaskStatus
  taskCount: number
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (
    <CircleDashedIcon className="size-[18px] text-pink-400" />
  ),
  [TaskStatus.TODO]: (
    <CircleIcon className="size-[18px] text-red-400" />
  ),
  [TaskStatus.IN_PROGRESS]: (
    <CircleDotDashedIcon className="size-[18px] text-yellow-400" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <CircleDotIcon className="size-[18px] text-blue-400" />
  ),
  [TaskStatus.DONE]: (
    <CircleCheckIcon className="size-[18px] text-emerald-400" />
  ),
}

export const KanbanColumnHeader = ({ board, taskCount }: KanbanColumnHeaderProps) => {
  const icon = statusIconMap[board]
  const { open } = useCreateTaskModal()

  return (
    <div className="py-1.5 px-1 flex justify-between items-center min-w-[250px]">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="m-0 text-base capitalize font-semibold">
          {snakeCaseToTitleCase(board)}
        </h2>
        <div className="m-0 p-0 flex justify-center items-center size-5 bg-neutral-200 dark:bg-blue-600 rounded text-xs font-black text-muted-foreground dark:text-white">
          {taskCount}
        </div>
      </div>
      <div>
        <Button
          variant="ghost"
          className="m-0 p-0 size-6 bg-blue-600 hover:bg-blue-700 transition opacity-100! hover:text-white has-[>svg]:px-0 text-white rounded-full cursor-pointer"
          onClick={open}
        >
          <PlusIcon className="size-4 text-white" />
        </Button>
      </div>
    </div>
  )
}