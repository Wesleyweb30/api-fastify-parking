import prismaClient from '../lib/prisma';
import { Veiculo } from '../models/Veiculo';


class VeiculoService {

  static async criarVeiculo(dados: { modelo: string; placa: string; tipo: string }): Promise<Veiculo> {
    try {
      return await prismaClient.veiculo.create({ data: dados });
    } catch (error) {
      throw new Error('Erro ao criar veículo');
    }
  }


  static async obterVeiculos(): Promise<Veiculo[]> {
    try {
      return await prismaClient.veiculo.findMany();
    } catch (error) {
      throw new Error('Erro ao listar veículos');
    }
  }


  static async obterVeiculoPorId(id: string): Promise<Veiculo | null> {
    try {
      return await prismaClient.veiculo.findUnique({ where: { id } });
    } catch (error) {
      throw new Error('Erro ao buscar veículo por ID');
    }
  }


  static async obterVeiculoPorPlaca(placa: string): Promise<Veiculo | null> {
    try {
      return await prismaClient.veiculo.findUnique({ where: { placa } });
    } catch (error) {
      throw new Error('Erro ao buscar veículo por placa');
    }
  }


  static async atualizarVeiculo(id: string, dados: { modelo?: string; placa?: string; tipo?: string }): Promise<Veiculo | null> {
    try {
      return await prismaClient.veiculo.update({ where: { id }, data: dados });
    } catch (error) {
      throw new Error('Erro ao atualizar veículo');
    }
  }

  static async deletarVeiculo(id: string): Promise<boolean> {
    try {
      await prismaClient.veiculo.delete({ where: { id } });
      return true;
    } catch (error) {
      throw new Error('Erro ao deletar veículo');
    }
  }
}

export default VeiculoService;
