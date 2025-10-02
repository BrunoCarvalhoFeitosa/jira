"use client"
import { Fragment, useCallback } from "react"
import { useQueryState } from "nuqs"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useGetTasks } from "@/features/tasks/api/use-get-tasks"
import { useBulkUpdateTasks } from "@/features/tasks/api/use-bulk-update-tasks"
import { useTaskFilter } from "@/features/tasks/hooks/use-task-filter"
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal"
import { useFilterContext } from "@/contexts/filter-context"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"
import { DataFilters } from "../data-filters"
import { DataTable } from "../data-table"
import { DataKanban } from "../../kanban/data-kanban"
import { DataCalendar } from "../../calendar/data-calendar"
import { columns } from "../columns"
import { PlusIcon } from "lucide-react"
import { TaskStatus } from "@/features/tasks/types"
import { TbFilterSearch } from "react-icons/tb"
import { RiLoader4Fill } from "react-icons/ri"

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean
}

export const TaskViewSwitcher = ({ hideProjectFilter }: TaskViewSwitcherProps) => {
  const workspaceId = useWorkspaceId()
  const { open } = useCreateTaskModal()
  const { mutate: bulkUpdate } = useBulkUpdateTasks()
  const [{ projectId, status, assigneeId, dueDate }] = useTaskFilter()
  const { toggleFilter } = useFilterContext()

  const [view, setView] = useQueryState("task-view", {
    defaultValue: "tasks"
  })

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    assigneeId,
    status,
    dueDate
  })

  const onKanbanChange = useCallback((
    tasks: { $id: string; status: TaskStatus; position: number }[]
  ) => {
    bulkUpdate({ json: { tasks } })
  }, [bulkUpdate])

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="w-full h-full flex-1 border rounded-md"
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex flex-col gap-y-2 md:flex-row justify-between items-center">
          <TabsList className="w-full flex" defaultValue="calendar">
            <TabsTrigger
              className="w-full h-10 flex-1"
              value="tasks"
            >
              Tarefas
            </TabsTrigger>
            <TabsTrigger
              className="mx-2 w-full h-10 flex-1"
              value="kanban"
            >
              Kanban
            </TabsTrigger>
            <TabsTrigger
              className="w-full h-10 flex-1"
              value="calendar"
            >
              Calendário
            </TabsTrigger>
          </TabsList>
          <div className="w-full md:w-auto flex items-center gap-x-1">
            <Button
              className="flex-1 md:flex-none mt-2 lg:mt-0 md:ml-4 w-full md:w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
              onClick={() => open()}
            >
              <PlusIcon />
            </Button>
            <Button
              className="flex-1 md:flex-none mt-2 lg:mt-0 w-full md:w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
              onClick={toggleFilter}
            >
              <TbFilterSearch className="size-6" />
            </Button>
          </div>
        </div>
        <div className="my-4 w-full h-[1px] bg-neutral-100" />
        <div>
          <DataFilters hideProjectFilter={hideProjectFilter} />
        </div>
        <div className="my-4 w-full h-[1px] bg-neutral-100" />
        {isLoadingTasks ? (
          <div className="w-full h-[200px] flex justify-center items-center border rounded-lg">
            <RiLoader4Fill className="size-5 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <Fragment>
            <TabsContent className="mt-0" value="tasks">
              <DataTable
                columns={columns}
                data={tasks?.documents ?? []}
              />
            </TabsContent>
            <TabsContent className="mt-0" value="kanban">
              <DataKanban
                data={tasks?.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent className="mt-0 pb-4 h-full" value="calendar">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </Fragment>
        )}
      </div>
    </Tabs>
  )
}

