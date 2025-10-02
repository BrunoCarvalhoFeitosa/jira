"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCreateTask } from "@/features/tasks/api/use-create-task"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { cn } from "@/lib/utils"
import { createTaskSchema } from "@/features/tasks/schemas"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GridPattern } from "@/components/ui/grid-pattern"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "../../common/date-picker"
import { MemberAvatar } from "../../members/member-avatar"
import { MdWorkOutline } from "react-icons/md"
import { ProjectAvatar } from "../../common/project-avatar"
import { TaskStatus } from "@/features/tasks/types"
import { User2Icon } from "lucide-react"
import { FaTasks } from "react-icons/fa"
import { LuFolder } from "react-icons/lu"

interface CreateTaskFormProps {
  onCancel?: () => void
  projectOptions: {
    id: string
    name: string
    imageUrl: string
  }[]
  memberOptions: {
    id: string
    name: string
  }[]
}

export const CreateTaskForm = ({ onCancel, projectOptions, memberOptions }: CreateTaskFormProps) => {
  const workspaceId = useWorkspaceId()
  const { mutate, isPending } = useCreateTask()

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      status: TaskStatus.TODO,
      workspaceId,
      projectId: "",
      dueDate: new Date(),
      assigneeId: "",
      description: ""
    }
  })

  const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
    mutate({ json: { ...values, workspaceId } }, {
      onSuccess: () => {
        form.reset()
        onCancel?.()
      }
    })
  }
  
  return (
    <Card className="relative p-6 w-full h-full border-none rounded-md shadow-none bg-neutral-50">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] h-[90px]">
        <GridPattern />
      </div>
      <CardHeader className="relative px-0 flex z-30">
        <CardTitle className="text-xl lg:text-3xl font-semibold">
          Crie uma nova tarefa
        </CardTitle>
      </CardHeader>
      <CardContent className="relative px-0 h-full z-30">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base">
                      Título da tarefa
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <MdWorkOutline className="absolute left-3 w-5 h-5 text-neutral-300" />
                        <Input
                          {...field}
                          placeholder="Insira o título da tarefa"
                          className="pl-9 h-10 md:text-base bg-white focus-visible:border-gray-200 focus-visible:ring-0 placeholder:text-base placeholder:text-gray-300"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base">
                      Data de entrega
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        value={field.value as Date}
                        placeholder="Selecione uma data para entrega"
                      />
                    </FormControl>
                    <FormMessage className="font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base">
                      Responsável
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="m-0 w-full h-10 justify-start text-base focus-visible::ring-0 focus-visible:outline-none cursor-pointer">
                          <User2Icon className="text-gray-300 w-5 h-5" />
                          <SelectValue className="text-gray-100" placeholder="Selecione um responsável" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage className="font-semibold" />
                      <SelectContent>
                        {memberOptions.map((member) => (
                          <SelectItem
                            key={member.id}
                            value={member.id}
                          >
                            <div className="flex items-center gap-x-2">
                              <MemberAvatar
                                className="size-6"
                                name={member.name}
                              />
                              {member.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base">
                      Status
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="m-0 w-full h-10 justify-start text-base focus-visible::ring-0 focus-visible:outline-none cursor-pointer">
                          <FaTasks className="text-gray-300 w-4 h-4" />
                          <SelectValue className="text-gray-100" placeholder="Selecione um status" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage className="font-semibold" />
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base">
                      Projetos
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="m-0 w-full h-10 justify-start text-base focus-visible::ring-0 focus-visible:outline-none cursor-pointer">
                          <LuFolder className="text-gray-300 size-5" />
                          <SelectValue className="text-gray-100" placeholder="Selecione um projeto" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage className="font-semibold" />
                      <SelectContent>
                        {projectOptions.map((project) => (
                          <SelectItem
                            key={project.id}
                            value={project.id}
                          >
                            <div className="flex items-center gap-x-2">
                              <ProjectAvatar
                                className="size-6"
                                name={project.name}
                                image={project.imageUrl}
                              />
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-8 flex justify-end items-center gap-x-2">
              <Button
                disabled={isPending}
                type="button"
                variant="secondary"
                className={cn(
                  "lg:w-[140px] h-10 text-base rounded-md cursor-pointer",
                  onCancel ? "block" : "hidden"
                )}
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button
                disabled={isPending}
                type="submit"
                variant="default"
                className="lg:w-[240px] h-12 text-base rounded-md bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
              >
                Criar nova tarefa
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
