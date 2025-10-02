"use client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { AnalyticsCard } from "./analytics-card"
import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics"

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  if (!data) {
    return null
  }

  return (
    <ScrollArea className="p-6 w-full max-w-full max-h-[300px] border rounded-md overflow-hidden">
      <div className="flex space-x-6">
        <div className="flex-none w-52 border-r">
          <AnalyticsCard
            title="Total de tarefas"
            value={data.taskCount}
            variant={data.taskDifference > 0 ? "up" : "down"}
            increaseValue={data.taskDifference}
          />
        </div>
        <div className="flex-none w-52 border-r">
          <AnalyticsCard
            title="Minhas tarefas"
            value={data.assignedTaskCount}
            variant={data.assignedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.assignedTaskDifference}
          />
        </div>
        <div className="flex-none w-52">
          <AnalyticsCard
            title="Tarefas entregues"
            value={data.completedTaskCount}
            variant={data.completedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.completedTaskDifference}
          />
        </div>
        <div className="flex-none w-52 border-l">
          <AnalyticsCard
            title="Tarefas incompletas"
            value={data.incompletedTaskCount}
            variant={data.incompletedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.incompletedTaskDifference}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
