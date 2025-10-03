import React from "react"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { cn } from "@/lib/utils"
import { MemberAvatar } from "../../members/member-avatar"
import { ProjectAvatar } from "../../common/project-avatar"
import { Project } from "@/features/projects/types"
import { TaskStatus } from "@/features/tasks/types"
import { Member } from "@/features/members/types"

interface EventCardProps {
  title: string
  assignee: Member
  project: Project
  status: TaskStatus
  id: string
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-500",
  [TaskStatus.TODO]: "border-l-red-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.DONE]: "border-l-emerald-500",
}

export const EventCard = ({ title, assignee, project, status, id }: EventCardProps) => {
  const workspaceId = useWorkspaceId()
  const router = useRouter()

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    router.push(`/workspaces/${workspaceId}/tasks/${id}`)
  }

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "p-1.5 flex flex-col gap-y-1.5 border border-l-4 rounded-md bg-white dark:bg-[#1A1A1A] hover:opacity-75 cursor-pointer",
          statusColorMap[status]
        )}
      >
        <p title={title} className="text-xs text-primary truncate">
          {title}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-y-1 md:gap-x-1">
          <MemberAvatar
            name={assignee?.name}
            className="size-3 md:size-5 cursor-pointer"
            fallbackClassName="text-xs"
            isTooltip
          />
          <ProjectAvatar
            name={project?.name}
            image={project?.imageUrl}
            className="size-3 md:size-5 text-xs! cursor-pointer"
            fallbackClassName="text-xs!"
            isTooltip
          />
        </div>
      </div>
    </div>
  )
}
