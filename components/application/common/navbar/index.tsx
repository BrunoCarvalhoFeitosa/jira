"use client"
import { usePathname } from "next/navigation"
import { ThemeSwitch } from "@/components/root/theme-switch"
import { UserButton } from "@/components/auth/user-button"
import { MobileSidebar } from "../mobile-sidebar"

const pathnameMap = {
  "tasks": {
    title: "Tarefas",
    description: "Crie e monitore as tarefas da sua equipe."
  },
  "projects": {
    title: "Projetos",
    description: "Crie e gerencie múltiplos projetos."
  },
  "settings": {
    title: "Configurações",
    description: "Configure o seu projeto e convide membros."
  },
  "members": {
    title: "Membros",
    description: "Gerencie os membros da sua equipe."
  }
}

const defaultMap = {
  title: "Dashboard",
  description: "Monitore todos os seus projetos e tarefas aqui."
}

export const Navbar = () => {
  const pathname = usePathname()
  const pathnameParts = pathname.split("/")
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap
  const { title, description } = pathnameMap[pathnameKey] || defaultMap
  
  return (
    <nav className="sticky top-0 py-4 px-4 lg:px-10 flex items-center justify-between bg-background z-50">
      <div className="hidden lg:flex flex-col">
        <h1 className="text-xl font-semibold">
          {title}
        </h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <MobileSidebar />
      <div className="flex items-center">
        <ThemeSwitch context="application" />
        <UserButton />
      </div>
    </nav>
  )
}
