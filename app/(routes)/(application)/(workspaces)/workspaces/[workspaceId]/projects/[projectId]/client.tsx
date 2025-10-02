"use client"
import { useGetProject } from "@/features/projects/api/use-get-project"
import { useProjectId } from "@/features/projects/hooks/use-project-id"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectAvatar } from "@/components/application/common/project-avatar"
import { TaskViewSwitcher } from "@/components/application/tasks/task-view-switcher"
import { PageLoader } from "@/components/application/common/page-loader"
import { PageError } from "@/components/application/common/page-error"
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-project-analytics"
import { Analytics } from "@/components/application/analytics"

const ProjectIdClient = () => {
  const projectId = useProjectId()
  const { data: project, isLoading: isLoadingProject } = useGetProject({ projectId })
  const { data: analytics, isLoading: isLoadingProjectAnalytics } = useGetProjectAnalytics({ projectId })
  const isLoading = isLoadingProject || isLoadingProjectAnalytics

  if (isLoading) {
    return <PageLoader />
  }

  if (!project) {
    return <PageError message="Nenhum tarefa encontrada." />
  }

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project.name}
            image={project.imageUrl}
            fallbackClassName="size-7"
          />
          <div>
            <h3 className="m-0 text-lg font-semibold">
              {project.name}
            </h3>
          </div>
        </div>
        <div>
          <Button
            asChild
            type="button"
            className="md:w-[150px] h-10 text-base bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
          >
            <Link
              href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
              className="text-base"  
            >
              Editar projeto
            </Link>
          </Button>
        </div>
      </div>
      {analytics && (
        <Analytics data={analytics} />
      )}
      <TaskViewSwitcher />
    </div>
  )
}

export default ProjectIdClient
