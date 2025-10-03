import { z } from "zod"

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Este campo é obrigatório."),
    
    imageUrl: z.union([
      z.instanceof(File),
      z.string().transform((value) => value === "" ? undefined : value),
    ]).optional()
})

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Este campo é obrigatório.")
    .optional(),

  imageUrl: z.union([
    z.instanceof(File),
    z.string().transform((value) => value === "" ? undefined : value)
  ]).optional()
})

export const inviteSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(1, "Este campo é obrigatório."),

  inviteLink: z
    .string()
    .trim()
    .min(1, "Este campo é obrigatório."),

  email: z
    .string()
    .min(1, { message: "Este campo é obrigatório." })
    .email("O e-mail fornecido não é válido."),
})
