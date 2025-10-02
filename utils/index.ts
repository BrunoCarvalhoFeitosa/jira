import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go"
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5"
import { RiUser3Line, RiUser3Fill } from "react-icons/ri"

export const applicationNavigationRoutes = [
  {
    label: "Dashboard",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill
  },
  {
    label: "Tarefas",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: IoSettingsOutline,
    activeIcon: IoSettingsSharp
  },
  {
    label: "Membros",
    href: "/members",
    icon: RiUser3Line,
    activeIcon: RiUser3Fill
  },
]

export const getDate = () => {
  const now = new Date()

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  return formatter.format(now)
}
