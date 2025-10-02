"use client"
import { useProjectId } from "@/features/projects/hooks/use-project-id"
import { useGetProject } from "@/features/projects/api/use-get-project"
import { EditProjectForm } from "@/components/application/projects/edit-project-form"
import { PageLoader } from "@/components/application/common/page-loader"
import { PageError } from "@/components/application/common/page-error"

export const ProjectIdSettingsClient = () => {
  const projectId = useProjectId()
  const { data: initialValues, isLoading } = useGetProject({ projectId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!initialValues) {
    return <PageError message="Nenhum projeto encontrado." />
  }

  return (
    <div className="w-full">
      <EditProjectForm initialValues={initialValues} />
    </div>
  )
}
