"use client"
import { Logo } from "../logo"
import { Navigation } from "../navigation"
import { WorkspaceSwitcher } from "../workspace-switcher"
import { Projects } from "../projects"

export const Sidebar = () => {
  return (
    <aside className="p-4 pr-0 w-full h-full bg-neutral-50 dark:bg-[#1A1A1A]">
      <Logo
        squareWidth="w-10"
        squareHeight="h-10"
        iconSize="w-5 h-5"
        fontSize="text-xl"
      />
      <WorkspaceSwitcher />
      <Navigation />
      <Projects />
    </aside>
  )
}