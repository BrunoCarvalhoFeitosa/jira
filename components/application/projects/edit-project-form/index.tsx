"use client"
import { useRef } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useConfirm } from "@/features/hooks/use-confirm"
import { useUpdateProject } from "@/features/projects/api/use-update-project"
import { useDeleteProject } from "@/features/projects/api/use-delete-project"
import { updateProjectSchema } from "@/features/projects/schemas"
import { Project } from "@/features/projects/types"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GridPattern } from "@/components/ui/grid-pattern"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ImageIcon, Trash2Icon } from "lucide-react"
import { HiArrowLongLeft } from "react-icons/hi2"
import { MdWorkOutline } from "react-icons/md"

interface EditProjectFormProps {
  onCancel?: () => void
  initialValues: Project
}

export const EditProjectForm = ({ onCancel, initialValues }: EditProjectFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { mutate, isPending } = useUpdateProject()
  const { mutate: deleteProject, isPending: isDeletingProject } = useDeleteProject()

  const [ DeleteDialog, confirmDelete ] = useConfirm(
    "Deletar projeto",
    "Esta ação é irreversível e não poderá ser desfeita, tem certeza que deseja prosseguir?"
  )

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...initialValues,
      imageUrl: initialValues.imageUrl ?? ""
    }
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]

    if (file) {
      form.setValue("imageUrl", file)
    }
  }

  const handleDelete = async () => {
    const ok = await confirmDelete()

    if (!ok) {
      return
    }

    deleteProject({
      param: { projectId: initialValues.$id }
    }, {
      onSuccess: () => {
        window.location.href = `/workspaces/${initialValues.workspaceId}`
      }
    })
  }

  const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
    const finalValues = {
      ...values,
      imageUrl: values.imageUrl instanceof File ? values.imageUrl : ""
    }

    mutate({
      form: finalValues,
      param: { projectId: initialValues.$id }
    }, {
      onSuccess: () => {
        form.reset()
        window.location.reload()
      }
    })
  }
  
  return (
    <div className="relative flex flex-col gap-y-6 overflow-hidden">
      <DeleteDialog />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] h-[130px]">
        <GridPattern />
      </div>
      <Card className="p-6 w-full h-full border-none rounded-md shadow-none bg-gray-50">
        <CardHeader className="relative px-0 flex z-10">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3 flex-1">
              <Button
                variant="ghost"
                className="p-0 flex justify-center items-center w-10 h-10 bg-neutral-100 dark:bg-[#1A1A1A] rounded-full cursor-pointer"
                onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`)}
              >
                <HiArrowLongLeft className="w-5 h-5" />
              </Button>
              <CardTitle className="text-xl lg:text-3xl font-semibold">
                Editar projeto 
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative px-0 z-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col gap-y-2">
                        <div className="w-full flex flex-col gap-y-5">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-1 items-center gap-x-2">
                              {field.value ? (
                                <div className="relative p-2 flex size-[50px] bg-white border rounded-md overflow-hidden">
                                  <Image
                                    fill
                                    alt="Logo"
                                    className="object-cover scale-[0.8]"
                                    src={field.value instanceof File
                                      ? URL.createObjectURL(field.value)
                                      : field.value
                                    }
                                  />
                                </div>
                              ) : (
                                <Avatar className="border rounded-md size-[50px]">
                                  <AvatarFallback className="rounded-md bg-white dark:bg-[#1A1A1A]">
                                    <ImageIcon className="size-[20px] text-neutral-300" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                <h1 className="text-xl font-semibold">
                                  {form.watch("name")}
                                </h1>
                              </div>
                            </div>
                            <div>
                              <Button
                                disabled={isPending || isDeletingProject}
                                type="button"
                                size="default"
                                variant="ghost"
                                className="gap-1 pr-6 h-10 justify-start text-base rounded-md hover:bg-red-500 dark:hover:bg-red-500 text-black dark:text-white hover:text-white transition cursor-pointer"
                                onClick={handleDelete}
                              >
                                <Trash2Icon className="size-5" />
                              </Button>
                            </div>
                          </div>
                          <div className="w-full flex flex-col">
                            <FormLabel className="mb-2 text-base">
                              Imagem do projeto
                            </FormLabel>
                            <input
                              type="file"
                              ref={inputRef}
                              className="hidden"
                              accept=".jpg, .png, .svg, .jpeg"
                              disabled={isPending}
                              onChange={handleImageChange}
                            />
                            {field.value ? (
                              <Button
                                disabled={isPending}
                                type="button"
                                size="sm"
                                variant="outline"
                                className="w-full h-10 justify-start font-normal rounded-md hover:bg-white text-black transition cursor-pointer"
                                onClick={() => {
                                  field.onChange(null)

                                  if (inputRef.current) {
                                    inputRef.current.value === ""
                                  }
                                }}
                              >
                                <ImageIcon className="w-5 h-5 text-neutral-300" />
                                Remover imagem
                              </Button>
                            ): (
                              <Button
                                type="button"
                                disabled={isPending}
                                size="sm"
                                variant="outline"
                                className="w-full h-10 justify-start font-normal rounded-md hover:bg-white text-black dark:text-white transition cursor-pointer"
                                onClick={() => inputRef.current?.click()}
                              >
                                <ImageIcon className="w-5 h-5 text-neutral-300" />
                                Escolher imagem
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-base">
                        Nome do projeto
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex items-center">
                          <MdWorkOutline className="absolute left-3 w-5 h-5 text-neutral-300" />
                          <Input
                            {...field}
                            placeholder="Insira o nome do espaço de trabalho"
                            className="pl-9 h-10 text-lg bg-white focus-visible:border-gray-200 focus-visible:ring-0 placeholder:text-base placeholder:text-gray-300"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-semibold" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5 flex justify-end items-center gap-3">
                <Button
                  disabled={isPending}
                  type="submit"
                  variant="default"
                  className="md:w-[240px] h-10 text-base rounded-md bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
                  onClick={onCancel}
                >
                  Editar projeto
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
