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
              <Button variant="outline" size="lg" className="w-12 h-10 dark:bg-transparent border-none shadow-none rounded-none hover:bg-transparent dark:hover:bg-transparent focus-visible:ring-0 cursor-pointer">
                <IoSettingsSharp className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <IoSettingsSharp className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
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
        <div className="fixed bottom-4 right-4 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="bg-white">
              <Button variant="outline" size="lg" className="w-12 h-10 cursor-pointer rounded-none">
                <IoSettingsSharp className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <IoSettingsSharp className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
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
