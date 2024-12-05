import prismaClient from '../lib/prisma';
import { Veiculo } from '../models/veiculo';

class VeiculoService {
    
  static async criarVeiculo(dados: {modelo: string, placa: string, tipo: string }): Promise<Veiculo> {
    return await prismaClient.veiculo.create({
      data: dados,
    });
  }

  static async obterVeiculos(): Promise<Veiculo[]> {
    return await prismaClient.veiculo.findMany();
  }

  static async obterVeiculoPorPlaca(placa: string): Promise<Veiculo | null> {
    return await prismaClient.veiculo.findUnique({
      where: { placa },
    });
  }

  static async obterVeiculoPorId(id: string): Promise<Veiculo | null> {
    return await prismaClient.veiculo.findUnique({
      where: { id },
    });
   
  }

  static async atualizarVeiculo(id: string, dados: { marca?: string, modelo?: string, ano?: number, placa?: string }): Promise<Veiculo | null> {
    return await prismaClient.veiculo.update({
      where: { id },
      data: dados,
    });
  }

  static async deletarVeiculo(id: string): Promise<Veiculo | null> {
    return await prismaClient.veiculo.delete({
      where: { id },
    });
  }
}

export default VeiculoService;
