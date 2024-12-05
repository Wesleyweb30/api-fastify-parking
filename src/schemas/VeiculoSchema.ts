import { z } from 'zod';

export const createVeiculoSchema = z.object({
  modelo: z.string().min(1, "O modelo é obrigatório"),
  placa: z.string().min(7, "Placa inválida").max(7, "Placa inválida"),
  tipo: z.string().max(10, "No maximo 10 caracteres")
});

export const updateVeiculoSchema = createVeiculoSchema.partial();  // Permite atualizações parciais
