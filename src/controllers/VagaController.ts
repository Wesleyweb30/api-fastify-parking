import { FastifyReply, FastifyRequest } from "fastify";
import { createVagaSchema, updateVagaSchema } from "../schemas/VagaSchema";
import VagaService from "../services/VagaService";
import z from "zod";

interface VagaRequestParams {
    id: string;
    numero: number;
}

class VagaController {

    static async criarVaga(req: FastifyRequest, res: FastifyReply) {
        try {
            const dados = createVagaSchema.parse(req.body);
            const vaga = await VagaService.criarVaga(dados);
            return res.code(201).send(vaga);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).send({ error: 'Dados inválidos', detalhes: error.errors });
            }
            return res.status(500).send({ error: 'Erro ao criar Vaga' });
        }
    }


    static async listarVagas(_: FastifyRequest, res: FastifyReply) {
        try {
            const vagas = await VagaService.obterVagas();
            return res.code(200).send(vagas)
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao listar vagas' });
        }
    }


    static async obterVagaPorId(req: FastifyRequest<{ Params: VagaRequestParams }>, res: FastifyReply) {
        try {
            const { id } = req.params;
            const vaga = await VagaService.obterVagaPorId(id);
            if (!vaga) {
                return res.status(404).send({ error: 'Vaga não encontrado' });
            }
            return res.status(200).send(vaga);
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao buscar Vaga' });
        }
    }


    static async obterVagaPorNumero(req: FastifyRequest<{ Querystring: VagaRequestParams }>, res: FastifyReply) {
        try {
            const { numero } = req.query;
            const vaga = await VagaService.obterVagaPorNumero(Number(numero));
            if (!vaga) {
                return res.status(404).send({ error: 'Vaga não encontrado' });
            }
            return res.status(200).send(vaga);
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao buscar Vaga' });
        }
    }


    static async atualizarVaga(req: FastifyRequest<{ Params: VagaRequestParams }>, res: FastifyReply) {
        try {
            const { id } = req.params;
            const dados = updateVagaSchema.parse(req.body);
            const vaga = await VagaService.atualizarVaga(id, dados);
            if (!vaga) {
                return res.status(404).send({ message: " Vaga não encontrada" })
            }
            return res.code(201).send(vaga);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).send({ error: 'Dados inválidos', detalhes: error.errors });
            }
            return res.status(500).send({ error: 'Erro ao criar Vaga' });
        }
    }


    static async deletarVaga(req: FastifyRequest<{ Params: VagaRequestParams }>, res: FastifyReply) {
        try {
            const { id } = req.params;
            const sucesso = await VagaService.deletarVaga(id);
            if (!sucesso) {
                return res.status(404).send({ error: 'Vaga não encontrado' });
            }
            return res.status(200).send({ message: "Vaga deletado com sucesso" })
        } catch (error) {
            return res.status(500).send({ message: "Erro ao deletado vaga" })
        }
    }



}

export default VagaController;
