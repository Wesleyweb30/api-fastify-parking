import { FastifyInstance } from 'fastify';
import VeiculoController from '../controllers/veiculoController';

async function veiculoRoutes(app: FastifyInstance) {
  app.post('/veiculos', VeiculoController.criarVeiculo);
  app.get('/veiculos', VeiculoController.obterVeiculos);
  app.get('/veiculos/:id', VeiculoController.obterVeiculoPorId);
  app.get('/veiculos/placa/:placa', VeiculoController.obterVeiculoPorPlaca);
  app.put('/veiculos/:id', VeiculoController.atualizarVeiculo);
  app.delete('/veiculos/:id', VeiculoController.deletarVeiculo);
}

export default veiculoRoutes;
