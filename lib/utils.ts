import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInCalendarDays } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateInviteCode(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

export function snakeCaseToTitleCase(str: string) {
  if (!str) {
    return
  }

  switch(str) {
    case "BACKLOG":
      str = "Backlog"
      break
    case "TODO":
      str = "A fazer"
      break
    case "IN_PROGRESS":
      str = "Andamento"
      break
    case "IN_REVIEW":
      str = "Validação"
      break
    case "DONE":
      str = "Entregue"
      break
  }

  return str
    .toLocaleLowerCase()
    .replace(/_/g, " ")
}

export type PriorityLevel = "alta" | "media" | "baixa"

export function getPriorityLevel (dueDate: string): PriorityLevel {
  const due = typeof dueDate === "string" ? new Date(dueDate) : dueDate
  const today = new Date()
  const daysUntilDue = differenceInCalendarDays(due, today)

  if (daysUntilDue <= 5) return "alta"
  if (daysUntilDue <= 10) return "media"

  return "baixa"
}

export function isDescriptionEmpty(html?: string): boolean {
  if (!html) return true

  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = html

  const text = tempDiv.textContent || tempDiv.innerText || ""

  return text.replace(/\u00A0/g, "").trim() === ""
}
