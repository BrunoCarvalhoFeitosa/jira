"use client"
import { useLogout } from "@/features/auth/api/use-logout"
import { useCurrent } from "@/features/auth/api/use-current"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RiLoader4Fill } from "react-icons/ri"
import { IoIosLogOut } from "react-icons/io"

export const UserButton = () => {
  const { mutate: logout } = useLogout()
  const { data: user, isLoading } = useCurrent()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center size-10 rounded-full bg-neutral-200 border border-neutral-300">
        <RiLoader4Fill className="size-4 text-muted-foreground animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const { name, email } = user

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U"

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none cursor-pointer">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="flex justify-center items-center font-medium text-neutral-500 bg-neutral-100">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
        <div className="py-4 px-2.5 flex flex-col justify-center items-center gap-2">
          <Avatar className="size-[52px] hover:opacity-75 transition border border-neutral-300">
            <AvatarFallback className="flex justify-center items-center font-medium text-neutral-500 bg-neutral-100">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || "Usuário"}
            </p>
            <p className="text-xs text-neutral-500">
              {email}
            </p>
          </div>
          <DropdownMenuItem className="p-0 w-full h-10 flex justify-center rounded-none border-t border-neutral-200">
            <Button
              variant="ghost"
              className="w-full flex justify-center items-center text-red-500 hover:text-red-500 cursor-pointer"
              onClick={() => logout()}
            >
              <IoIosLogOut className="w-8 h-8 text-red-500" />
              <span className="text-md font-semibold">
                Encerrar sessão
              </span>
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}