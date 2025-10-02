"use client"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal"
import Link from "next/link"
import { ProjectAvatar } from "../project-avatar"
import { RiAddCircleFill } from "react-icons/ri"

export const Projects = () => {
  const pathname = usePathname()
  const { open } = useCreateProjectModal()
  const workspaceId = useWorkspaceId()
  const { data } = useGetProjects({
    workspaceId
  })

  return (
    <div className="mt-4 pt-4 flex flex-col gap-y-2 border-t">
      <div className="pr-4 mb-2 flex justify-between items-center">
        <h3 className="m-0 text-sm uppercase font-semibold text-neutral-500 dark:text-white">
          Projetos
        </h3>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 dark:text-white cursor-pointer"
        />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`
        const isActive = pathname === href

        return (
          <Link key={project.$id} href={href}>
            <div className={cn(
              "relative p-2.5 flex items-center gap-2.5 text-neutral-500 dark:text-white font-semibold hover:opacity-75 transition cursor-pointer",
              isActive && "text-primary bg-white dark:bg-[#333] shadow-sm rounded-tl-md rounded-bl-md hover:opacity-100 before:block before:absolute before:right-0 before:w-[5px] before:h-full before:bg-blue-600"
            )}>
              <ProjectAvatar
                name={project.name}
                image={project.imageUrl}
              />
              <span className="truncate">
                {project.name}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

