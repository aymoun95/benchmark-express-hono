import z from "zod";

// Zod schemas
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((n) => n > 0),
});

export const nameBodySchema = z.object({
  name: z.string().min(1),
});
