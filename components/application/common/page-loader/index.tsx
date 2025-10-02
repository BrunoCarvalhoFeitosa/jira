"use client"
import { RiLoader4Fill } from "react-icons/ri"

export const PageLoader = () => {
  return (
    <div className="h-[calc(100dvh-240px)] flex justify-center items-center">
      <RiLoader4Fill className="size-6 text-muted-foreground animate-spin" />
    </div>
  )
}