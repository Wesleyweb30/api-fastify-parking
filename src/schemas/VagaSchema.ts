import z from "zod";

export const createVagaSchema = z.object({
    numero: z.number().min(1, {message: "O numero é obrigatório"}),
    setor: z.string(),
    status: z.string(),
});

export const updateVagaSchema = createVagaSchema.partial();