"use client"
import { useGetTask } from "@/features/tasks/api/use-get-task"
import { useTaskId } from "@/features/tasks/api/use-task-id"
import { PageLoader } from "@/components/application/common/page-loader"
import { PageError } from "@/components/application/common/page-error"
import { TaskBreadcrumbs } from "@/components/application/tasks/task-breadcrumbs"
import { TaskOverview } from "@/components/application/tasks/task-overview"
import { TaskDetails } from "@/components/application/tasks/task-details"
import { Project } from "@/features/projects/types"

export const TaskIdClient = () => {
  const taskId = useTaskId()
  const { data, isLoading } = useGetTask({ taskId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!data) {
    return <PageError message="Nenhum tarefa encontrada." />
  }

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs
        project={data.project as Project}
        task={data}
      />
      <div className="my-3 w-full h-[1px] bg-neutral-100" />
      <div className="mt-4 w-full flex flex-col lg:flex-row gap-6">
        <TaskOverview task={data} />
        <TaskDetails task={data} />
      </div>
    </div>
  )
}
