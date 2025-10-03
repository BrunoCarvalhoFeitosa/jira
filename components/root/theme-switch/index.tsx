"use client"
import { Fragment } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IoSettingsSharp } from "react-icons/io5"

interface ThemeSwitchProps {
  context: "application" | "root"
}

export const ThemeSwitch = ({ context }: ThemeSwitchProps ) => {
  const { setTheme } = useTheme()

  return (
    <Fragment>
      {context === "application" ? (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="bg-white">
              <Button variant="outline" size="lg" className="w-8 h-8 dark:bg-transparent border-none shadow-none rounded-none hover:bg-transparent dark:hover:bg-transparent focus-visible:ring-0 has-[>svg]:px-0 cursor-pointer">
                <IoSettingsSharp className="h-[1.2rem] w-[1.2rem] text-neutral-500 dark:text-white scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <IoSettingsSharp className="absolute h-[1.2rem] w-[1.2rem] text-neutral-500 dark:text-white scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Tema claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Tema escuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="fixed bottom-3 right-3 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="bg-white">
              <Button variant="outline" size="lg" className="w-14 h-12 rounded-md cursor-pointer">
                <IoSettingsSharp className="size-[1.5rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <IoSettingsSharp className="absolute size-[1.5rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Tema claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Tema escuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </Fragment>
  )
}
