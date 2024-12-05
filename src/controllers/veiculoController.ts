import { FastifyReply, FastifyRequest } from 'fastify';
import VeiculoService from '../services/VeiculoService';
import { createVeiculoSchema, updateVeiculoSchema } from '../schemas/VeiculoSchema';
import { Veiculo } from '../models/veiculo';

class VeiculoController {
    
  static async criarVeiculo(req: FastifyRequest, res: FastifyReply) {
    try {
      const dados = createVeiculoSchema.parse(req.body);
      const veiculo: Veiculo= await VeiculoService.criarVeiculo(dados);
      return res.status(201).send(veiculo);
    } catch (error) {
      return res.status(400).send({ error: error || 'Erro ao criar veículo' });
    }
  }

  static async obterVeiculos(req: FastifyRequest, res: FastifyReply) {
    try {
      const veiculos: Veiculo[] | null = await VeiculoService.obterVeiculos();
      return res.status(200).send(veiculos);
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao listar veículos' });
    }
  }

  static async obterVeiculoPorId(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = req.params;
      const veiculo: Veiculo | null = await VeiculoService.obterVeiculoPorId(id);
      if (veiculo) {
        return res.status(200).send(veiculo);
      } else {
        return res.status(404).send({ error: 'Veículo não encontrado' });
      }
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao buscar veículo' });
    }
  }

  static async obterVeiculoPorPlaca(req: FastifyRequest, res: FastifyReply){
    try {
      const { placa } = req.params;
      const veiculo: Veiculo | null = await VeiculoService.obterVeiculoPorPlaca(String(placa));
      if (veiculo) {
        return res.status(200).send(veiculo);
      } else {
        return res.status(404).send({ error: 'Error ao buscar veículo'})
      }
    } catch (error) {
      return res.status(500).send({error: 'Esta placa não pertence a nenhum veículo cadastrado no sistema.'})
    }
  }

  static async atualizarVeiculo(req: FastifyRequest, res: FastifyReply) {
    try {
      const dados = updateVeiculoSchema.parse(req.body);
      const { id } = req.params; 
      const veiculo: Veiculo | null = await VeiculoService.atualizarVeiculo(String(id), dados);
      if (veiculo) {
        return res.status(200).send(veiculo);
      } else {
        return res.status(404).send({ error: 'Veículo não encontrado' });
      }
    } catch (error) {
      return res.status(400).send({ error: error || 'Erro ao atualizar veículo' });
    }
  }

  static async deletarVeiculo(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id }  = req.params;
      const veiculo: Veiculo | null = await VeiculoService.deletarVeiculo(String(id));
      if (veiculo) {
        return res.status(200).send({ message: 'Veículo deletado' });
      } else {
        return res.status(404).send({ error: 'Veículo não encontrado' });
      }
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao deletar veículo' });
    }
  }
}

export default VeiculoController;
