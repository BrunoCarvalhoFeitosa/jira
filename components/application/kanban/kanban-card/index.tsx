import { Task } from "@/features/tasks/types"
import { TaskActions } from "../../tasks/task-actions"
import { ClockIcon, MoreHorizontalIcon } from "lucide-react"
import { MemberAvatar } from "../../members/member-avatar"
import { TaskDate } from "../../tasks/task-date"

interface KanbanCardProps {
  task: Task
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="p-2.5 mb-1.5 space-y-3 rounded shadow-sm bg-white cursor-grab">
      <div className="flex justify-between items-center gap-x-2">
        <p className="text-sm line-clamp-1" title={task.name}>
          {task.name}
        </p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontalIcon className="size-[18px] stroke-1 shrink-0 text-neutral-300 cursor-pointer" />
        </TaskActions>
      </div>
      <div className="w-full h-[1px] bg-neutral-200" />
      <MemberAvatar
        name={task.assignee.name}
        fallbackClassName="size-5 text-xs"
        showLabel={true}
      />
      <div className="w-full h-[1px] bg-neutral-200" />
      <div className="flex items-center gap-x-1">
        <ClockIcon className="size-4 text-neutral-500" />
        <TaskDate
          value={task.dueDate}
          className="text-xs text-neutral-500 h-[18px]"
        />
      </div>
    </div>
  )
}
