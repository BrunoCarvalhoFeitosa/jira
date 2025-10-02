"use client"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { cn } from "@/lib/utils"
import { DatePicker } from "../../common/date-picker"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TaskStatus } from "@/features/tasks/types"
import { FaTasks } from "react-icons/fa"
import { useTaskFilter } from "@/features/tasks/hooks/use-task-filter"
import { User2Icon } from "lucide-react"
import { LuFolder } from "react-icons/lu"

interface DataFiltersProps {
  hideProjectFilter?: boolean
}

export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId()
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })
  const isLoading = isLoadingProjects || isLoadingMembers

  const projectOptions = projects?.documents.map((project) => ({
    value: project.$id,
    label: project.name
  }))

  const memberOptions = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name
  }))

  const [{
    projectId,
    status,
    assigneeId,
    dueDate
  }, setFilters] = useTaskFilter()

  const onStatusChange = (value: string) => {
    if (value === "all") {
      setFilters(null)
    } else {
      setFilters({ status: value as TaskStatus })
    }
  }

  const onAssigneeChange = (value: string) => {
    if (value === "all") {
      setFilters(null)
    } else {
      setFilters({ assigneeId: value as string })
    }
  }

  const onProjectChange = (value: string) => {
    if (value === "all") {
      setFilters(null)
    } else {
      setFilters({ projectId: value as string })
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className={cn(
          "w-full flex-1 lg:w-auto h-10! text-base data-[placeholder]:text-muted-foreground rounded-md focus-visible:ring-0 cursor-pointer"
        )}>
          <div className="pr-2 flex items-center gap-x-2">
            <FaTasks className="size-4" />
            <SelectValue placeholder="Todos os status" className="placeholder:text-muted-foreground" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            Todos os status
          </SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>
            Backlog
          </SelectItem>
          <SelectItem value={TaskStatus.TODO}>
            A fazer
          </SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>
            Em andamento
          </SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>
            Em validação
          </SelectItem>
          <SelectItem value={TaskStatus.DONE}>
            Entregue
          </SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className={cn(
          "w-full flex-1 lg:w-auto h-10! text-base data-[placeholder]:text-muted-foreground rounded-md focus-visible:ring-0 cursor-pointer"
        )}>
          <div className="pr-2 flex items-center gap-x-2">
            <User2Icon className="size-5" />
            <SelectValue placeholder="Todos os responsáveis" className="placeholder:text-muted-foreground" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            Todos os responsáveis
          </SelectItem>
          <SelectSeparator />
          {memberOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!hideProjectFilter && (
        <Select
          defaultValue={projectId ?? undefined}
          onValueChange={(value) => onProjectChange(value)}
        >
          <SelectTrigger className="w-full flex-1 lg:w-auto h-10! text-base data-[placeholder]:text-muted-foreground rounded-md focus-visible:ring-0 cursor-pointer">
            <div className="pr-2 flex items-center gap-x-2">
              <LuFolder className="size-5" />
              <SelectValue placeholder="Todos os projetos" className="placeholder:text-muted-foreground" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              Todos os projetos
            </SelectItem>
            <SelectSeparator />
            {projectOptions?.map((project) => (
              <SelectItem key={project.value} value={project.value}>
                {project.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <DatePicker
        placeholder="Data de entrega"
        className={cn(
          "w-full lg:w-auto flex-1 h-10 text-muted-foreground"
        )}
        iconColor="size-5 text-muted-foreground"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({ dueDate: date ? date.toISOString() : null })
        }}
      />
    </div>
  )
}
