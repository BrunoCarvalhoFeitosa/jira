import { z } from "zod"

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Este campo obrigatório."),

  imageUrl: z.union([
    z.instanceof(File),
    z.string().transform((value) => value === "" ? undefined : value),
  ]).optional(),

  workspaceId: z.string()
})

export const updateProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Este campo é obrigatório.")
    .optional(),

  imageUrl: z.union([
    z.instanceof(File),
    z.string().transform((value) => value === "" ? undefined : value),
  ]).optional(),

  workspaceId: z.string()
})
