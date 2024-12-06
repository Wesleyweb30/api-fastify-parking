import { Vaga } from "@prisma/client";
import prismaClient from "../lib/prisma";

class VagaService {

    static async criarVaga(dados: {numero: number, setor: string, status: string}): Promise<Vaga> {
        try {
            return await prismaClient.vaga.create({data: dados});
        } catch (error) {
            throw new Error ('Error ao criar vaga') ;
        }
    }

    static async obterVagas(): Promise<Vaga[]> {
        try {
            return await prismaClient.vaga.findMany();
        } catch (error) {
            throw new Error ('Error ao lsitar vagas');
        }
    }

    static async obterVagaPorId(id : string) : Promise<Vaga | null> {
        try {
            return await prismaClient.vaga.findUnique({where : { id }});
        } catch (error) {
            throw new Error ('Error ao buscar vagas');
        }
    }

    static async obterVagaPorNumero(numero : number) : Promise<Vaga | null> {
        try {
            return await prismaClient.vaga.findUnique({where : { numero }});
        } catch (error) {
            throw new Error ('Error ao buscar vagas');
        }
    }

    static async atualizarVaga(id: string, dados : { numero?: number, setor?: string, status?: string}) : Promise<Vaga | null> {
        try {
            return await prismaClient.vaga.update({ where: {id}, data: dados});
            
        } catch (error){
            throw new Error ('Error ao atualizar vagas');
        }
    }

    static async deletarVaga(id: string) : Promise<boolean>{
        try {
            await prismaClient.vaga.delete({ where : { id }});
            return true;
        } catch (error) {
            throw new Error ('Error ao deletar vaga');
        }
    }
}


export default VagaService;