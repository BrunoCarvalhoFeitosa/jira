"use client"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { Card, CardContent } from "@/components/ui/card"
import { CreateTaskForm } from "../create-task-form"
import { RiLoader4Fill } from "react-icons/ri"
import { Project } from "@/features/projects/types"
import { Member } from "@/features/members/types"

interface CreateTaskFormWrapperProps {
  onCancel: () => void
}

export const CreateTaskFormWrapper = ({ onCancel }: CreateTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId()
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })

  const projectOptions = projects?.documents.map((project: Project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl
  }))

  const memberOptions = members?.documents.map((member: Member) => ({
    id: member.$id,
    name: member.name,
  }))

  const isLoading = isLoadingProjects || isLoadingMembers

  if (isLoading) {
    return (
      <Card className="w-full h-[514px] border-none shadow-none">
        <CardContent className="flex justify-center items-center w-full h-full">
          <RiLoader4Fill className="size-5 text-muted-foreground animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <CreateTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  )
}