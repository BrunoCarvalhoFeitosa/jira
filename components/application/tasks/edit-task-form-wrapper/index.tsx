"use client"
import { useGetTask } from "@/features/tasks/api/use-get-task"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { Card, CardContent } from "@/components/ui/card"
import { EditTaskForm } from "../edit-task-form"
import { RiLoader4Fill } from "react-icons/ri"
import { Project } from "@/features/projects/types"
import { Member } from "@/features/members/types"

interface EditTaskFormWrapperProps {
  id: string
  onCancel: () => void
}

export const EditTaskFormWrapper = ({ id, onCancel }: EditTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId()
  const { data: initialValues, isLoading: isLoadingTask } = useGetTask({ taskId: id })
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })
  const isLoading = isLoadingTask || isLoadingProjects || isLoadingMembers

  const projectOptions = projects?.documents.map((project: Project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl
  }))

  const memberOptions = members?.documents.map((member: Member) => ({
    id: member.$id,
    name: member.name,
  }))

  if (isLoading) {
    return (
      <Card className="w-full h-[514px] border-none shadow-none">
        <CardContent className="flex justify-center items-center w-full h-full">
          <RiLoader4Fill className="size-5 text-muted-foreground animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (!initialValues) {
    return null
  }

  return (
    <EditTaskForm
      onCancel={onCancel}
      initialValues={initialValues}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  )
}