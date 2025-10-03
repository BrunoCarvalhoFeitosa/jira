"use client"
import DOMPurify from "dompurify"
import Autoplay from "embla-carousel-autoplay"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics"
import { useGetTasks } from "@/features/tasks/api/use-get-tasks"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal"
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal"
import { PageLoader } from "@/components/application/common/page-loader"
import { PageError } from "@/components/application/common/page-error"
import { Analytics } from "@/components/application/analytics"
import { Task } from "@/features/tasks/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ProjectAvatar } from "@/components/application/common/project-avatar"
import { useEditTaskModal } from "@/features/tasks/hooks/use-edit-task-modal"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { MemberAvatar } from "@/components/application/members/member-avatar"
import { Project } from "@/features/projects/types"
import { Member } from "@/features/members/types"
import { PencilIcon, PlusIcon } from "lucide-react"

export const WorkspaceIdClient = () => {
  const workspaceId = useWorkspaceId()
  const { data: analytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics({ workspaceId })
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId })
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })
  const isLoading = isLoadingAnalytics || isLoadingTasks || isLoadingProjects || isLoadingMembers

  if (isLoading) {
    return <PageLoader />
  }

  if (!analytics || !tasks || !projects || !members) {
    return <PageError message="Falha ao carregar dados do espaço de trabalho." />
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="w-full grid grid-cols-1 gap-5">
        <TaskList data={tasks.documents} total={tasks.total} />
        <ProjectList data={projects.documents} total={projects.total} />
        <MemberList data={members.documents} total={members.total} />
      </div>
    </div>
  )
}

interface TaskListProps {
  data: Task[]
  total: number
}

export const TaskList = ({ data, total }: TaskListProps) => {
  const workspaceId = useWorkspaceId()
  const { open: createTask } = useCreateTaskModal()
  const { open: editTask } = useEditTaskModal()

  return (
    <div className="mt-4 w-full flex flex-col gap-y-4 bg-neutral-50 dark:bg-transparent border rounded-md">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-1">
            <h2 className="m-0 font-semibold text-lg">
              Tarefas
            </h2>
            <div className="size-5 flex justify-center items-center rounded-full font-sans text-[11px] font-extrabold bg-neutral-200 dark:bg-blue-600 border border-neutral-400 dark:border-none">
              {total}
            </div>
          </div>
          <div>
            <Button
              variant="ghost"
              className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 transition cursor-pointer"
              onClick={createTask}
            >
              <PlusIcon className="size-5 text-white" />
            </Button>
          </div>
        </div>
        <div className="mt-5 w-full">
          {total >= 1 ? (
            <Carousel
              className="relative flex flex-col gap-y-4"
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnFocusIn: true,
                  stopOnMouseEnter: true
                })
              ]}
            >
              <CarouselContent>
                {data.map((task) => (
                  <CarouselItem key={task.$id} className="md:basis-1/2">
                    <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                      <Card className="p-4 h-full shadow-none border-none bg-neutral-100 dark:bg-[#1A1A1A] rounded-md">
                        <CardContent className="px-0">
                          <div className="mb-2 flex flex-col">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-x-1">
                                <ProjectAvatar
                                  name={task.project.name}
                                  image={task.project.image}
                                />
                                <span className="font-semibold text-muted-foreground">
                                  {task.project.name}
                                </span>
                              </div>
                              <div>
                                <Button
                                  variant="ghost"
                                  className="has-[>svg]:px-0 hover:bg-transparent dark:hover:bg-transparent cursor-pointer"
                                  onClick={() => editTask(task.$id)}
                                >
                                  <PencilIcon className="size-5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div>
                          {task.name && (
                            <h4 className="font-semibold">
                              {task.name}
                            </h4>
                          )}
                          {task.description && (
                            <p className="mt-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(task.description) }} />
                          )}
                          </div>
                        </CardContent>
                        <CardFooter className="p-0 border-t [.border-t]:pt-3">
                          <p>
                            Deverá ser entregue até {format(task.dueDate, "dd/MM/yyyy", { locale: ptBR })}
                          </p>
                        </CardFooter>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -bottom-11 left-8">
                <CarouselPrevious className="cursor-pointer" />
              </div>
              <div className="absolute -bottom-11 left-1">
                <CarouselNext className="cursor-pointer" />
              </div>
            </Carousel>
          ) : (
            <p className="font-semibold text-muted-foreground">
              Nenhuma tarefa encontrada.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

interface ProjectListProps {
  data: Project[]
  total: number
}

export const ProjectList = ({ data, total }: ProjectListProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { open: createTask } = useCreateProjectModal()

  return (
    <div className="mt-[60px] w-full flex flex-col gap-y-4 bg-neutral-50 dark:bg-transparent border rounded-md">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-1">
            <h2 className="m-0 font-semibold text-lg">
              Projetos
            </h2>
            <div className="size-5 flex justify-center items-center rounded-full font-sans text-[11px] font-extrabold bg-neutral-200 dark:bg-blue-600 border border-neutral-400 dark:border-none">
              {total}
            </div>
          </div>
          <div>
            <Button
              variant="ghost"
              className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 transition cursor-pointer"
              onClick={createTask}
            >
              <PlusIcon className="size-5 text-white" />
            </Button>
          </div>
        </div>
        <div className="mt-5 w-full">
          {total >= 1 ? (
            <Carousel
              className="relative flex flex-col gap-y-4 h-full"
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnFocusIn: true,
                  stopOnMouseEnter: true
                })
              ]}
            >
              <CarouselContent>
                {data.map((project) => (
                  <CarouselItem key={project.$id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="p-4 shadow-none border-none bg-neutral-100 dark:bg-[#1A1A1A] rounded-md">
                      <CardContent className="px-0">
                        <div className="mb-2 flex flex-col">
                          <div className="flex justify-between items-center">
                            <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                              <div className="flex items-center gap-x-1">
                                <ProjectAvatar
                                  name={project.name}
                                />
                                <span className="font-semibold text-muted-foreground">
                                  {project.name}
                                </span>
                              </div>
                            </Link>
                            <div>
                              <Button
                                variant="ghost"
                                className="has-[>svg]:px-0 hover:bg-transparent dark:hover:bg-transparent cursor-pointer"
                                onClick={() => router.push(`/workspaces/${workspaceId}/projects/${project.$id}/settings`)}
                              >
                                <PencilIcon className="size-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
             <div className="absolute -bottom-11 left-8">
                <CarouselPrevious className="cursor-pointer" />
              </div>
              <div className="absolute -bottom-11 left-1">
                <CarouselNext className="cursor-pointer" />
              </div>
            </Carousel>
          ) : (
            <p className="font-semibold text-muted-foreground">
              Nenhum projeto encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

interface MemberListProps {
  data: Member[]
  total: number
}

export const MemberList = ({ data, total }: MemberListProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()

  return (
    <div className="mt-[60px] w-full flex flex-col gap-y-4 bg-neutral-50 dark:bg-transparent border rounded-md">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-1">
            <h2 className="m-0 font-semibold text-lg">
              Membros
            </h2>
            <div className="size-5 flex justify-center items-center rounded-full font-sans text-[11px] font-extrabold bg-neutral-200 dark:bg-blue-600 border border-neutral-400 dark:border-none">
              {total}
            </div>
          </div>
          <div>
            <Button
              variant="ghost"
              className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 transition cursor-pointer"
              onClick={() => router.push(`/workspaces/${workspaceId}/members`)}
            >
              <PlusIcon className="size-5 text-white" />
            </Button>
          </div>
        </div>
        <div className="mt-5 w-full">
          {total >= 1 ? (
            <Carousel
              className="relative flex flex-col gap-y-4 h-full"
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnFocusIn: true,
                  stopOnMouseEnter: true
                })
              ]}
            >
              <CarouselContent>
                {data.map((member) => (
                  <CarouselItem key={member.$id} className="md:basis-1/2 lg:basis-1/3">
                    <Link href={`/workspaces/${workspaceId}/members`}>
                      <Card className="p-4 shadow-none border-none bg-neutral-100 dark:bg-[#1A1A1A] rounded-md">
                        <CardContent className="px-0">
                          <div className="mb-2 flex flex-col">
                            <div className="flex justify-between items-center gap-3">
                              <div className="flex items-center gap-x-1">
                                <MemberAvatar
                                  name={member.name}
                                  className="size-6 cursor-pointer"
                                  showLabel
                                  labelClassName="font-semibold text-muted-foreground"
                                />
                              </div>
                              <div>
                                <Button
                                  variant="ghost"
                                  className="has-[>svg]:px-0 hover:bg-transparent dark:hover:bg-transparent cursor-pointer"
                                  onClick={() => router.push(`/workspaces/${workspaceId}/members/${member.$id}/`)}
                                >
                                  <PencilIcon className="size-5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
             <div className="absolute -bottom-11 left-8">
                <CarouselPrevious className="cursor-pointer" />
              </div>
              <div className="absolute -bottom-11 left-1">
                <CarouselNext className="cursor-pointer" />
              </div>
            </Carousel>
          ) : (
            <p className="font-semibold text-muted-foreground">
              Nenhum membro encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
