import prismaClient from "../lib/prisma";
import { Estacionamento } from "../models/Estacionamento";

class EstacionamentoService {

    static async registrarEstacionamento(dados: { veiculoId: string; vagaId: string }): Promise<Estacionamento> {
        try {
            const veiculo = await prismaClient.veiculo.findUnique({
                where: { id: dados.veiculoId },
            });
            if (!veiculo) {
                throw new Error("Veículo não encontrado");
            }

            const vaga = await prismaClient.vaga.findUnique({
                where: { id: dados.vagaId },
            });
            if (!vaga) {
                throw new Error("Vaga não encontrada");
            }

            if (vaga.status !== "livre") {
                throw new Error("Vaga ocupada");
            }

            await prismaClient.vaga.update({
                where: { id: dados.vagaId },
                data: { status: "ocupada" },
            });

            return await prismaClient.estacionamento.create({
                data: {
                    veiculoId: dados.veiculoId,
                    vagaId: dados.vagaId,
                },
            });
        } catch (error) {
            console.error("Erro ao criar estacionamento:", error);
            throw error;
        }
    }


    static async encerrarEstacionamento(id: string): Promise<Estacionamento | null> {
        const estacionamento = await prismaClient.estacionamento.findUnique({
            where: { id },
            include: { vaga: true, veiculo: true },
        });

        if (!estacionamento) {
            throw new Error("Estacionamento não encontrado");
        }

        const saida = new Date();

        const tempoEstacionado = (saida.getTime() - estacionamento.entrada.getTime()) / 1000 / 60;

        let valor = 0;

        
        if (tempoEstacionado <= 20) {
            valor = 0;
        } else if (tempoEstacionado <= 60) {
            valor = 10.00;
        } else if (tempoEstacionado <= 120) {
            valor = 15.00;
        } else {
            valor = 25.00;
        }

        const estacionamentoAtualizado = await prismaClient.estacionamento.update({
            where: { id },
            data: {
                saida: saida,
                valor: valor,
            },
        });

        await prismaClient.vaga.update({
            where: { id: estacionamento.vagaId },
            data: { status: 'livre' },
        });

        return estacionamentoAtualizado;
    }


    static async obterEstacionamentos(): Promise<Estacionamento[]> {
        try {
            return await prismaClient.estacionamento.findMany();
        } catch (error: unknown) {
            throw new Error("Error ao listar estacionamentos")
        }
    }




}

export default EstacionamentoService;
