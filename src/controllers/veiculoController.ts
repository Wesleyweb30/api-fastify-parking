import { FastifyReply, FastifyRequest } from 'fastify';
import VeiculoService from '../services/VeiculoService';
import { createVeiculoSchema, updateVeiculoSchema } from '../schemas/VeiculoSchema';
import { Veiculo } from '../models/veiculo';
import z from 'zod';

interface VeiculoRequestParams {
  id: string;
  placa: string
}
class VeiculoController {
    
  static async criarVeiculo(req: FastifyRequest, res: FastifyReply) {
    try {
      const dados = createVeiculoSchema.parse(req.body);
      const veiculo = await VeiculoService.criarVeiculo(dados);
      return res.status(201).send(veiculo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ error: 'Dados inválidos', detalhes: error.errors });
      }
      return res.status(500).send({ error: 'Erro ao criar veículo' });
    }
  }

  static async obterVeiculos(_: FastifyRequest, res: FastifyReply) {
    try {
      const veiculos = await VeiculoService.obterVeiculos();
      return res.status(200).send(veiculos);
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao listar veículos' });
    }
  }

   
  static async obterVeiculoPorId(req: FastifyRequest<{ Params: VeiculoRequestParams }>, res: FastifyReply) {
    try {
      const { id } = req.params;
      const veiculo = await VeiculoService.obterVeiculoPorId(id);
      if (!veiculo) {
        return res.status(404).send({ error: 'Veículo não encontrado' });
      }
      return res.status(200).send(veiculo);
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao buscar veículo' });
    }
  }


  static async obterVeiculoPorPlaca(req: FastifyRequest<{ Params: VeiculoRequestParams }>, res: FastifyReply) {
    try {
      const { placa } = req.params;
      const veiculo = await VeiculoService.obterVeiculoPorPlaca(placa);
      if (!veiculo) {
        return res.status(404).send({ error: 'Veículo não encontrado' });
      }
      return res.status(200).send(veiculo);
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao buscar veículo por placa' });
    }
  }


  static async atualizarVeiculo(req: FastifyRequest<{ Params: VeiculoRequestParams; Body: z.infer<typeof updateVeiculoSchema> }>, res: FastifyReply) {
    try {
      const { id } = req.params;
      const dados = updateVeiculoSchema.parse(req.body);
      const veiculo = await VeiculoService.atualizarVeiculo(id, dados);
      if (!veiculo) {
        return res.status(404).send({ error: 'Veículo não encontrado' });
      }
      return res.status(200).send(veiculo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ error: 'Dados inválidos', detalhes: error.errors });
      }
      return res.status(500).send({ error: 'Erro ao atualizar veículo' });
    }
  }

  
  static async deletarVeiculo(req: FastifyRequest<{ Params: VeiculoRequestParams }>, res: FastifyReply) {
    try {
      const { id } = req.params;
      const sucesso = await VeiculoService.deletarVeiculo(id);
      if (!sucesso) {
        return res.status(404).send({ error: 'Veículo não encontrado' });
      }
      return res.status(200).send({ message: 'Veículo deletado com sucesso' });
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao deletar veículo' });
    }
  }




}

export default VeiculoController;
