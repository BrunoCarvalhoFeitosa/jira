import { z } from "zod"
import { TaskStatus } from "../types"

export const createTaskSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Este campo é obrigatório."),

  status: z
    .nativeEnum(TaskStatus, {
      error: "Este campo é obrigatório."
    }),

  workspaceId: z
    .string()
    .trim()
    .min(1, "Este campo é obrigatório."),

  projectId: z
    .string()
    .trim()
    .min(1, "Este campo é obrigatório."),
    
  dueDate: z
    .coerce
    .date(),
    
  assigneeId: z
    .string()
    .trim()
    .min(1, "Este campo é obrigatório."),
  
  description: z
    .string()
    .optional()
})
