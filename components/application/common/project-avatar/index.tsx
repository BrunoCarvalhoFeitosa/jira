"use client"
import { Fragment } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface ProjectAvatarProps {
  image?: string
  name: string
  className?: string
  fallbackClassName?: string
  isTooltip?: boolean
}

export const ProjectAvatar = ({ image, name, className, fallbackClassName, isTooltip }: ProjectAvatarProps) => {
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
          title={name}
          className="object-cover scale-[0.8]"
        />
      </div>
    )
  }
  
  return (
    <Fragment>
      {isTooltip ? (
        <Tooltip>
          <TooltipTrigger>
            <Avatar className={cn(
              "relative size-6 rounded-md overflow-hidden bg-blue-600",
              className,
              fallbackClassName
            )}>
              <AvatarFallback className={cn(
                "text-lg font-semibold text-white bg-transparent",
                fallbackClassName
              )}>
                {name[0]}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            {name}
          </TooltipContent>
        </Tooltip>
      ) : (
        <Avatar className={cn(
          "relative size-6 rounded-md overflow-hidden bg-blue-600",
          className,
          fallbackClassName
        )}>
          <AvatarFallback
            title={name}
            className={cn(
              "text-lg font-semibold text-white bg-transparent",
              fallbackClassName
            )}
          >
            {name[0]}
          </AvatarFallback>
        </Avatar>
      )}
    </Fragment>
  )
}
