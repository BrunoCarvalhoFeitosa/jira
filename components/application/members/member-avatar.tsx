"use client"
import { Fragment } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface MemberAvatarProps {
  name: string
  className?: string
  fallbackClassName?: string
  showLabel?: boolean
  labelClassName?: string
  isTooltip?: boolean
}

export const MemberAvatar = ({ name, className, fallbackClassName, showLabel, labelClassName, isTooltip = false }: MemberAvatarProps) => {
  return (
    <Fragment>
      {isTooltip ? (
        <Tooltip>
          <TooltipTrigger>
            <Avatar className={cn(
              "relative size-6 rounded-md overflow-hidden bg-neutral-200",
              className,
              fallbackClassName
            )}>
              <AvatarFallback className={cn(
                  "flex justify-center items-center bg-neutral-200 font-semibold text-neutral-500",
                  fallbackClassName
                )}
              >
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            {name}
          </TooltipContent>
        </Tooltip>
      ) : (
      <div className="flex items-center gap-x-1">
        {showLabel && (
          <div className="flex items-center gap-x-1">
            <Avatar className={cn(
              "relative size-6 rounded-md overflow-hidden bg-neutral-200",
              className,
              fallbackClassName
            )}>
              <AvatarFallback className={cn(
                  "flex justify-center items-center bg-neutral-200 font-semibold text-neutral-500",
                  fallbackClassName
                )}
              >
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className={labelClassName}>
              {name}
            </span>
          </div>
        )}
      </div>
      )}
    </Fragment>
  )
}
