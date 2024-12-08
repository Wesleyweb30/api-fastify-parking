import { FastifyReply, FastifyRequest } from 'fastify';
import { createEstacionamentoSchema } from '../schemas/EstacionamentoSchema';
import EstacionamentoService from '../services/EstacionamentoService';

interface EstacionamentoRequestParams {
    id: string;
}

class EstacionamentoController {

    static async registrarEstacionamento(req: FastifyRequest, res: FastifyReply) {
        try {
            const dados = createEstacionamentoSchema.parse(req.body);
            const estacionamento = await EstacionamentoService.registrarEstacionamento(dados);
            return res.code(201).send(estacionamento);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro no registro:", error.message);

                if (error.message === 'Veículo não encontrado') {
                    return res.status(404).send({
                        error: 'Veículo não encontrado',
                        detalhes: 'O ID do veículo fornecido não existe no sistema.',
                    });
                }

                if (error.message === 'Vaga não encontrada') {
                    return res.status(404).send({
                        error: 'Vaga não encontrada',
                        detalhes: 'O ID da vaga fornecido não existe no sistema.',
                    });
                }

                if (error.message === 'Vaga ocupada') {
                    return res.status(400).send({
                        error: 'Vaga ocupada',
                        detalhes: 'A vaga selecionada já está ocupada.',
                    });
                }

              
                return res.status(500).send({
                    error: 'Erro interno',
                    detalhes: error.message || 'Ocorreu um erro inesperado.',
                });
            } else {
                // Caso o erro não seja uma instância de Error
                console.error("Erro desconhecido:", error);
                return res.status(500).send({
                    error: 'Erro interno',
                    detalhes: 'Ocorreu um erro inesperado.',
                });
            }
        }
    }


    static async encerrarEstacionamento(req: FastifyRequest<{Params: EstacionamentoRequestParams}>, res: FastifyReply) {
        const { id } = req.params
        try {
            const estacionamento = await EstacionamentoService.encerrarEstacionamento(id);

            if (!estacionamento) {
                return res.status(404).send({
                    error: 'Estacionamento não encontrado',
                    detalhes: `Não foi encontrado estacionamento com o ID ${id}.`,
                });
            }

            return res.code(200).send({
                message: 'Estacionamento encerrado com sucesso',
                estacionamento,
            });
        } catch (error: unknown) {
            console.error("Erro ao encerrar estacionamento:", error);
            return res.status(500).send({
                error: 'Erro interno',
                detalhes: 'Não foi possível encerrar o estacionamento.',
            });
        }
    }

    
    static async listarEstacionamentos(_: FastifyRequest, res: FastifyReply) {
        try {
            const estacionamentos =  await EstacionamentoService.obterEstacionamentos();
            return res.code(200).send(estacionamentos)
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao listar Estacionamentos' });
        }
    }


}

export default EstacionamentoController;