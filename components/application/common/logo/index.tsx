"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SiJira } from "react-icons/si"

interface LogoProps {
  squareWidth: string
  squareHeight: string
  iconSize: string
  fontSize?: string
}

export const Logo = ({ squareWidth, squareHeight, iconSize, fontSize }: LogoProps) => {
  return (
    <Link href="/application" className="flex items-center gap-1.5">
      <div className={cn(squareWidth, squareHeight, "flex justify-center items-center bg-blue-600 rounded-md")}>
        <SiJira className={cn(iconSize, "text-white")} />
      </div>
      <span className={cn(fontSize ? fontSize : "text-lg", "font-semibold text-neutral-700 dark:text-white")}>
        Jira
      </span>
    </Link>
  )
}
