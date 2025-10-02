"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { applicationNavigationRoutes } from "@/utils"

export const Navigation = () => {
  const workspaceId = useWorkspaceId()
  const pathname = usePathname()

  return (
    <nav className="mt-4 w-full">
      <ul className="flex flex-col gap-2.5">
        {applicationNavigationRoutes.map((item, index) => {
          const fullHref = `/workspaces/${workspaceId}${item.href}`
          const isActive = pathname === fullHref
          const Icon = isActive ? item.activeIcon : item.icon
          
          return (
            <li key={index}>
              <Link
                href={fullHref}
                className={cn(
                  "relative px-1.5 h-10 flex items-center gap-2.5 font-medium rounded-md text-neutral-500 hover:text-primary transition-all duration-150",
                  isActive && "text-primary bg-white shadow-sm hover:opacity-100 rounded-md rounded-tr-none rounded-br-none before:block before:absolute before:right-0 before:w-[5px] before:h-full before:bg-blue-600"
                )}
              >
                <Icon className="size-5 text-neutral-500" />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
