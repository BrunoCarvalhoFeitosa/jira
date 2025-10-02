"use client"
import { useState } from "react"
import DOMPurify from "dompurify"
import { Button } from "@/components/ui/button"
import { TaskRichText } from "../task-rich-text"
import { isDescriptionEmpty } from "@/lib/utils"
import { Task } from "@/features/tasks/types"
import { PencilIcon, XIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface TaskOverviewProps {
  task: Task
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
  const [edit, setEdit] = useState<boolean>(false)

  const handleToggleEdit = () => {
    setEdit(!edit)
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="mb-6">
        <h2 className="text-xl md:text-3xl font-semibold">
          {task.name}
        </h2>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-base md:text-xl font-semibold">
            Descrição
          </h3>
          <div>
            <Button
              variant="ghost"
              className="p-0 has-[>svg]:px-0 hover:bg-transparent cursor-pointer"
              onClick={handleToggleEdit}
            >
              {edit ? (
                <XIcon className="size-5" />
              ) : (
                <PencilIcon className="size-4" />
              )}
            </Button>
          </div>
        </div>
        {edit ? (
          <div>
            <TaskRichText
              task={task}
              initialValue={task.description}
              setEdit={setEdit}
            />
          </div>
        ) : (
          <div className="mt-4 rich-text-container">
            {isDescriptionEmpty(task.description) ? (
              <p className="text-base">
                Nenhuma descrição foi adicionada a esta tarefa.
              </p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(task.description) }} />
            )}
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-y-1">
        <div className="mb-4">
          <h4 className="text-base md:text-xl font-semibold">
            Detalhes
          </h4>
        </div>
        <div className="flex items-center gap-x-1">
          <span className="text-base">
            Tarefa criada em:
          </span>
          <span className="text-base">
            {format(task.$createdAt, "dd/MM/yyyy hh:mm:ss", { locale: ptBR })}
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <span className="text-base">
            Tarefa atualizada em:
          </span>
          <span className="text-base">
            {format(task.$updatedAt, "dd/MM/yyyy hh:mm:ss", { locale: ptBR })}
          </span>
        </div>
      </div>
    </div>
  )
}
