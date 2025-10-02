"use client"
import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"

interface DatePickerProps {
  value: Date | undefined
  onChange: (date: Date) => void
  className?: string
  iconColor?: string
  placeholder?: string
}

export const DatePicker = ({ value, onChange, className, iconColor, placeholder }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex justify-start items-center font-normal text-base hover:bg-transparent cursor-pointer",
            !value && "text-gray-300 hover:text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className={cn(
            "size-5",
            iconColor ? iconColor : "text-gray-300"
          )}
          />
           {value ? (
            format(value, "PPP", { locale: ptBR })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto" align="start">
        <Calendar
          mode="single"
          lang="pt"
          selected={value}
          onSelect={(date) => onChange(date as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
