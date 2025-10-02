"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Task } from "@/features/tasks/types"
import { Button } from "@/components/ui/button"
import { ProjectAvatar } from "../../common/project-avatar"
import { MemberAvatar } from "../../members/member-avatar"
import { TaskDate } from "../task-date"
import { Badge } from "@/components/ui/badge"
import { snakeCaseToTitleCase } from "@/lib/utils"
import { TaskActions } from "../task-actions"
import { ArrowUpDownIcon, MoreVerticalIcon } from "lucide-react"

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0! flex items-center gap-x-2 text-base hover:bg-transparent cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome da tarefa
          <ArrowUpDownIcon className="size-3" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.original.name

      return (
        <p className="line-clamp-1">
          {name}
        </p>
      )
    }
  },
  {
    accessorKey: "project",
    header: ({ column }) => {
      return (
        <Button
        variant="ghost"
        className="px-0! flex items-center gap-x-2 text-base hover:bg-transparent cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Projeto
        <ArrowUpDownIcon className="size-3" />
      </Button>
      )
    },
    cell: ({ row }) => {
      const project = row.original.project

      return (
        <div className="flex items-center gap-x-2 text-sm font-semibold">
          <ProjectAvatar
            className="size-6"
            name={project.name}
            image={project.imageUrl}
          />
          <p className="line-clamp-1">
            {project.name}
          </p>
        </div>
      )
    }
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <Button
        variant="ghost"
        className="px-0! flex items-center gap-x-2 text-base hover:bg-transparent cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Responsável
        <ArrowUpDownIcon className="size-3" />
      </Button>
      )
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee

      return (
        <div className="flex items-center gap-x-2 text-sm font-semibold">
          <MemberAvatar
            className="size-6"
            fallbackClassName="text-xs"
            name={assignee.name}
          />
          <p className="line-clamp-1">
            {assignee.name}
          </p>
        </div>
      )
    }
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
        variant="ghost"
        className="px-0! flex items-center gap-x-2 text-base hover:bg-transparent cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Data de entrega
        <ArrowUpDownIcon className="size-3" />
      </Button>
      )
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate

      return (
        <TaskDate value={dueDate} />
      )
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
        variant="ghost"
        className="px-0! flex items-center gap-x-2 text-base hover:bg-transparent cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDownIcon className="size-3" />
      </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.original.status

      return (
        <Badge variant={status} className="w-full h-8 capitalize">
          {snakeCaseToTitleCase(status)}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.$id
      const projectId = row.original.projectId

      return (
        <TaskActions
          id={id}
          projectId={projectId}
        >
          <Button
            variant="ghost"
            className="p-0 size-8 hover:bg-transparent cursor-pointer"
          >
            <MoreVerticalIcon className="size-4" />
          </Button>
        </TaskActions>
      )
    }
  }
]
