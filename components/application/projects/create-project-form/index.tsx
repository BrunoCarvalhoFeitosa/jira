"use client"
import { useRef } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useCreateProject } from "@/features/projects/api/use-create-project"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { cn } from "@/lib/utils"
import { createProjectSchema } from "@/features/projects/schemas"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GridPattern } from "@/components/ui/grid-pattern"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ImageIcon } from "lucide-react"
import { MdWorkOutline } from "react-icons/md"

interface CreateProjectFormProps {
  onCancel?: () => void
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { mutate, isPending } = useCreateProject()

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })),
    defaultValues: {
      name: "",
    }
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]

    if (file) {
      form.setValue("imageUrl", file)
    }
  }

  const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
    const finalValues = {
      ...values,
      workspaceId,
      imageUrl: values.imageUrl instanceof File ? values.imageUrl : ""
    }

    mutate({ form: finalValues }, {
      onSuccess: ({ data }) => {
        form.reset()
        onCancel?.()
        router.push(`/workspaces/${workspaceId}/projects/${data.$id}`)
      }
    })
  }
  
  return (
    <Card className="relative p-6 w-full h-full border-none rounded-md shadow-none bg-neutral-50">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] h-[130px]">
        <GridPattern />
      </div>
      <CardHeader className="relative px-0 flex z-30">
        <CardTitle className="text-xl lg:text-3xl font-semibold">
          Crie um novo projeto
        </CardTitle>
      </CardHeader>
      <CardContent className="relative px-0 z-30">
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
                        <div className="flex items-center gap-x-2">
                          {field.value ? (
                            <div className="relative p-2 size-[50px] bg-white border rounded-md overflow-hidden">
                              <Image
                                fill
                                alt="Logo"
                                className="object-cover"
                                src={field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                                }
                              />
                            </div>
                          ) : (
                            <Avatar className="border rounded-md size-[50px]">
                              <AvatarFallback className="rounded-md bg-white">
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
                        <div className="w-full flex flex-col">
                          <FormLabel className="mb-2 text-base data-[error=true]:text-black">
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
                              type="button"
                              disabled={isPending}
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
                              <ImageIcon className="w-5 h-5 text-neutral-400" />
                              Remover imagem
                            </Button>
                          ): (
                            <Button
                              type="button"
                              disabled={isPending}
                              size="sm"
                              variant="outline"
                              className="w-full h-10 justify-start text-base font-normal rounded-md hover:bg-white text-black transition cursor-pointer"
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
                          placeholder="Insira o nome do projeto"
                          className="pl-9 h-10 text-lg bg-white focus-visible:border-gray-200 focus-visible:ring-0 placeholder:text-base placeholder:text-gray-300"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-semibold" />
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
                Criar projeto
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
