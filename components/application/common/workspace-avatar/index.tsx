"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface WorkspaceAvatarProps {
  image?: string
  name: string
  className?: string
}

export const WorkspaceAvatar = ({ image, name, className }: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div className={
        cn(
          "relative px-2 size-6 rounded-md overflow-hidden bg-white border border-neutral-300",
          className
        )
      }>
        <Image
          fill
          src={image}
          alt={name}
          className="object-cover scale-[0.8]"
        />
      </div>
    )
  }
  
  return (
    <Avatar className={cn(
      "relative size-6 rounded-md overflow-hidden bg-blue-600",
      className
    )}>
      <AvatarFallback className="text-lg font-semibold text-white bg-transparent">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  )
}
