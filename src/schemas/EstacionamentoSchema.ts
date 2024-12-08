import z from "zod";

export const createEstacionamentoSchema = z.object({
    veiculoId : z.string(),
    vagaId : z.string(),
});

export const updateEstacionamentoSchema = createEstacionamentoSchema.partial();