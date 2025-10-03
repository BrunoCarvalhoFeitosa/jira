"use client"
import { useRef } from "react"
import emailjs from "@emailjs/browser"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace"
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspaces"
import { useResetInviteCode } from "@/features/workspaces/api/use-reset-invite-code"
import { useConfirm } from "@/features/hooks/use-confirm"
import { inviteSchema, updateWorkspaceSchema } from "@/features/workspaces/schemas"
import { Workspace } from "../../../../features/workspaces/types"
import Image from "next/image"
import { getDate } from "@/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GridPattern } from "@/components/ui/grid-pattern"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CopyIcon, ImageIcon, Trash2Icon } from "lucide-react"
import { HiArrowLongLeft } from "react-icons/hi2"
import { MdWorkOutline } from "react-icons/md"

interface EditWorkspaceFormProps {
  onCancel?: () => void
  initialValues: Workspace
}

export const EditWorkspaceForm = ({ onCancel, initialValues }: EditWorkspaceFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { mutate, isPending } = useUpdateWorkspace()
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } = useDeleteWorkspace()
  const { mutate: resetInviteCode, isPending: isResettingInviteCode } = useResetInviteCode()
  const inviteLink = `https://bruno-carvalho-feitosa-jira.vercel.app/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`

  const [ DeleteDialog, confirmDelete ] = useConfirm(
    "Deletar espaço de trabalho",
    "Esta ação é irreversível e não poderá ser desfeita, tem certeza que deseja prosseguir?"
  )

  const [ ResetDialog, confirmReset ] = useConfirm(
    "Resetar link de convite",
    "Esta ação fará com que o link atual não seja mais válido, tem certeza que deseja prosseguir?"
  )

  const editForm = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      imageUrl: initialValues.imageUrl ?? ""
    }
  })

  const inviteForm = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      projectName: initialValues.name,
      inviteLink,
      email: ""
    }
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]

    if (file) {
      editForm.setValue("imageUrl", file)
    }
  }

  const handleDelete = async () => {
    const ok = await confirmDelete()

    if (!ok) {
      return
    }

    deleteWorkspace({
      param: { workspaceId: initialValues.$id }
    })
  }

  const handleResetInviteCode = async () => {
    const ok = await confirmReset()

    if (!ok) {
      return
    }

    resetInviteCode({
      param: { workspaceId: initialValues.$id }
    }) 
  }

  const onSubmitEditWorkspace = (values: z.infer<typeof updateWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      imageUrl: values.imageUrl instanceof File ? values.imageUrl : ""
    }

    mutate({
      form: finalValues,
      param: { workspaceId: initialValues.$id }
    }, {
      onSuccess: ({ data }) => {
        editForm.reset()
        router.push(`/workspaces/${data.$id}`)
      }
    })
  }

  const onSubmitEmail = (data: z.infer<typeof inviteSchema>) => {
    if (!formRef.current) {
      console.error("Form reference is undefined.")
      return
    }

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      formRef.current, {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      })
      .then(
        () => {
          inviteForm.resetField("email")
          toast("E-mail enviado com sucesso.", {
            description: getDate(),
            action: {
              label: "Fechar",
              onClick: () => console.log("Undo"),
            },
            style: {
              '--normal-bg': 'color-mix(in oklab, light-dark(var(--color-blue-400), var(--color-blue-200)) 10%, var(--background))',
              '--normal-text': 'light-dark(var(--color-blue-400), var(--color-blue-200))',
              '--normal-border': 'light-dark(var(--color-blue-400), var(--color-blue-200))'
            } as React.CSSProperties
          })
        },
        (error) => {
          console.error("Error while send e-mail invite", error.text)
          toast.error("Oops, falha ao enviar convite por e-mail.", {
            style: {
              '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
              '--normal-text': 'var(--destructive)',
              '--normal-border': 'var(--destructive)'
            } as React.CSSProperties
          })
        },
      )
  }
  
  return (
    <div className="relative flex flex-col gap-y-6 overflow-hidden">
      <DeleteDialog />
      <ResetDialog />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] h-[130px]">
        <GridPattern />
      </div>
      <Card className="p-6 w-full h-full border-none rounded-md shadow-none bg-gray-50 dark:bg-[#111]">
        <CardHeader className="relative px-0 flex z-10">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3 flex-1">
              <Button
                variant="ghost"
                className="p-0 flex justify-center items-center w-10 h-10 bg-neutral-100 dark:bg-[#1A1A1A] rounded-full cursor-pointer"
                onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.$id}`)}
              >
                <HiArrowLongLeft className="w-5 h-5" />
              </Button>
              <CardTitle className="text-xl lg:text-3xl font-semibold">
                Editar espaço de trabalho
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative px-0 z-10">
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onSubmitEditWorkspace)} className="space-y-4">
              <div className="flex flex-col gap-4">
                <FormField
                  control={editForm.control}
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
                                  <AvatarFallback className="rounded-md bg-white">
                                    <ImageIcon className="size-[20px] text-neutral-300" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                <h1 className="text-xl font-semibold">
                                  {editForm.watch("name")}
                                </h1>
                              </div>
                            </div>
                            <div>
                              <Button
                                disabled={isPending || isDeletingWorkspace}
                                type="button"
                                size="default"
                                variant="ghost"
                                className="gap-1 pr-6 h-10 justify-start text-base rounded-md hover:bg-red-500 dark:hover:bg-red-500 text-black hover:text-white transition cursor-pointer"
                                onClick={handleDelete}
                              >
                                <Trash2Icon className="size-5 dark:text-white" />
                              </Button>
                            </div>
                          </div>
                          <div className="w-full flex flex-col">
                            <FormLabel className="mb-2 text-base">
                              Imagem do espaço de trabalho
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
                                className="w-full h-10 justify-start font-normal rounded-md hover:bg-white text-black dark:text-white transition cursor-pointer"
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
                                className="w-full h-10 justify-start font-normal rounded-md hover:bg-white text-black transition cursor-pointer"
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
                  control={editForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-base">
                        Nome do espaço de trabalho
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
                  className="md:w-[240px] h-10 text-base rounded-md bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
                  onClick={onCancel}
                >
                  Editar espaço de trabalho
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="relative p-6 w-full h-full border-none rounded-md shadow-none bg-gray-50 dark:bg-[#111]">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] h-[80px]">
          <GridPattern />
        </div>
        <CardHeader className="relative px-0 flex flex-col z-10">
          <CardTitle className="text-xl font-semibold">
            Resete o link de convite
          </CardTitle>
          <CardDescription className="text-base dark:text-white">
            Compartilhe este link para convidar novos membros a este espaço de trabalho.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 relative z-10">
          <div className="relative flex items-center">
            <Input
              disabled
              value={inviteLink}
              className="pr-12 h-10 bg-white dark:opacity-100 focus-visible:border-gray-200 focus-visible:ring-0 placeholder:text-base placeholder:text-gray-300 truncate"
            />
            <Button
              type="submit"
              variant="ghost"
              className="absolute right-0 hover:bg-transparent cursor-pointer"
            >
              <CopyIcon className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-5 flex justify-end">
            <Button
              disabled={isPending || isResettingInviteCode}
              type="button"
              variant="default"
              className="md:w-[240px] h-10 text-base rounded-md bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
              onClick={handleResetInviteCode}
            >
              Resetar link de convite
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="relative p-6 w-full h-full border-none rounded-md shadow-none bg-gray-50 dark:bg-[#111]">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] h-[80px]">
          <GridPattern />
        </div>
        <CardHeader className="relative px-0 flex flex-col z-10">
          <CardTitle className="text-xl font-semibold">
            Convide membros por e-mail
          </CardTitle>
          <CardDescription className="text-base dark:text-white">
            Envie um e-mail ao novo convidado para que ele faça parte deste espaço de trabalho.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 relative z-10">
           <Form {...inviteForm}>
            <form ref={formRef} onSubmit={inviteForm.handleSubmit(onSubmitEmail)} className="space-y-4">
              <div className="flex flex-col gap-4">
                <FormField
                  control={inviteForm.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem className="hidden flex-1">
                      <Input
                        {...field}
                        value={initialValues.name}
                        className="hidden pr-12 h-10 bg-white dark:opacity-100 focus-visible:border-gray-200 focus-visible:ring-0 placeholder:text-base placeholder:text-gray-300 truncate"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={inviteForm.control}
                  name="inviteLink"
                  render={({ field }) => (
                    <FormItem className="hidden flex-1">
                      <div className="relative items-center">
                        <Input
                          {...field}
                          value={inviteLink}
                          className="pr-12 h-10 bg-white dark:opacity-100 focus-visible:border-gray-200 focus-visible:ring-0 placeholder:text-base placeholder:text-gray-300 truncate"
                        />
                        <Button
                          type="submit"
                          variant="ghost"
                          className="absolute right-0 hover:bg-transparent cursor-pointer"
                        >
                          <CopyIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={inviteForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>
                        E-mail do convidado
                      </FormLabel>
                      <Input
                        {...field}
                        type="email"
                        className="pr-12 h-10 bg-white dark:opacity-100 focus-visible:border-gray-200 focus-visible:ring-0 placeholder:text-base placeholder:text-gray-300 truncate"
                        placeholder="Insira o e-mail do convidado"
                      />
                      <FormMessage className="font-semibold" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5 flex justify-end">
            <Button
              disabled={isPending || isResettingInviteCode}
              type="submit"
              variant="default"
              className="md:w-[240px] h-10 text-base rounded-md bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
            >
              Enviar convite por e-mail
            </Button>
          </div>
            </form>
          </Form>
          
        </CardContent>
      </Card>
    </div>
  )
}
