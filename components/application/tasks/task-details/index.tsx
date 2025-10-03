"use client"
import { useRouter } from "next/navigation"
import { useUpdateTask } from "@/features/tasks/api/use-update-task"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Task, TaskStatus } from "@/features/tasks/types"
import { PriorityLabel } from "../task-priority-label"
import { cn, getPriorityLevel } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaskDetailsProps {
  task: Task
}

export const TaskDetails = ({ task }: TaskDetailsProps) => {
  const router = useRouter()
  const { mutate: editTask, isPending: isUpdatingTask } = useUpdateTask()

  const handleUpdateStatus = (value: string) => {
    editTask({
      json: { status: value as TaskStatus },
      param: { taskId: task.$id }
    }, {
      onSuccess: () => {
        router.refresh()
      }
    })
  }

  return (
    <div className="p-6 flex flex-1 flex-col gap-y-3 h-max rounded-xl bg-neutral-100 dark:bg-[#1A1A1A]">
      <div>
        <Select
          disabled={isUpdatingTask}
          defaultValue={task.status ?? undefined}
          onValueChange={(value) => handleUpdateStatus(value)}
        >
          <SelectTrigger className={cn(
            "w-full flex-1 lg:w-auto h-10! text-base data-[placeholder]:text-white! rounded-md bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold focus-visible:ring-0 cursor-pointer",
          )}>
            <div className="pr-2 flex items-center gap-x-2">
              <SelectValue placeholder="Todos os status" className="placeholder:text-muted-foreground" />
            </div>
          </SelectTrigger>
          <SelectContent>
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
      </div>
      <div className="p-3 h-full rounded-md border">
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-x-1">
              <h3 className="m-0 font-semibold">
                Data de entrega prevista
              </h3>
            </div>
            <div className="flex items-center gap-x-1">
              <p className="text-sm text-muted-foreground">
                Deverá ser entregue até {format(task.dueDate, "dd/MM/yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-1">
              <h3 className="m-0 font-semibold">
                Responsável pela entrega
              </h3>
            </div>
            <div className="flex items-center gap-x-1">
              <p className="text-sm text-muted-foreground">
                Deverá ser entregue por {task.assignee.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-1">
              <h3 className="m-0 font-semibold">
                Prioridade
              </h3>
            </div>
            <div className="flex items-center gap-x-1">
              <PriorityLabel level={getPriorityLevel(task.dueDate)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
