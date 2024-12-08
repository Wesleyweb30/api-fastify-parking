import { Decimal } from "@prisma/client/runtime/library";

export interface Estacionamento {
    id: string;
    entrada: Date;
    saida: Date | null;
    valor: Decimal | null;
    veiculoId: string;
    vagaId: string;
    createdAt: Date;
    updatedAt: Date;
}