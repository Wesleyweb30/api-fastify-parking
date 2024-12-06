import { FastifyInstance } from "fastify";
import VagaController from "../controllers/vagaController";

async function vagaRoutes(app: FastifyInstance) {
    app.get('/vagas', VagaController.listarVagas);
    app.get('/vagas/:id', VagaController.obterVagaPorId);
    app.get('/vagas/numero/:numero', VagaController.obterVagaPorNumero);
    app.post('/vagas', VagaController.criarVaga);
    app.put('/vagas/:id', VagaController.atualizarVaga);
    app.delete('/vagas/:id', VagaController.deletarVaga);
}

export default vagaRoutes;