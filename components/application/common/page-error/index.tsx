"use client"
import { AlertTriangleIcon } from "lucide-react"

interface PageErrorProps {
  message: string
}

export const PageError = ({ message }: PageErrorProps) => {
  return (
    <div className="h-[calc(100dvh-240px)] flex flex-col justify-center items-center gap-y-2">
      <AlertTriangleIcon className="size-6 text-muted-foreground" />
      <h1 className="text-lg text-muted-foreground">
        {message}
      </h1>
    </div>
  )
}