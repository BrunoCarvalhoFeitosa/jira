"use client"
import CountUp from "react-countup"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"

interface AnalyticsCardProps {
  title: string
  value: number
  variant: "up" | "down"
  increaseValue: number
}

export const AnalyticsCard = ({ title, value, variant, increaseValue }: AnalyticsCardProps) => {
  const iconColor = variant === "up" ? "text-emerald-500" : "text-red-500"
  const increaseValueColor = variant === "up" ? "text-emerald-500" : "text-red-500"
  const Icon = variant === "up" ? FaCaretUp : FaCaretDown
  
  return (
    <Card className="w-full shadow-none border-none bg-transparent">
      <CardHeader>
        <div className="flex items-center gap-x-2.5">
          <CardDescription className="flex items-center gap-x-2 font-semibold overflow-hidden">
            <span className="text-base truncate">
              {title}
            </span>
          </CardDescription>
          <div className="flex items-center gap-x-1">
            <Icon className={cn(iconColor, "size-4")} />
            <span className={cn(increaseValueColor, "text-base font-semibold truncate")}>
              {increaseValue}
            </span>
          </div>
        </div>
        <CardTitle className="text-xl font-semibold">
          <CountUp
            start={0}
            end={value}
          />
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
