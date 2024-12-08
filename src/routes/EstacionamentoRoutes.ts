import { FastifyInstance } from "fastify";
import EstacionamentoController from "../controllers/EstacionamentoController";

export default async function EstacionamentoRoutes(app: FastifyInstance) {
    app.get('/estacionamentos', EstacionamentoController.listarEstacionamentos);
    app.post('/estacionamentos', EstacionamentoController.registrarEstacionamento);
    app.put('/estacionamentos/:id/encerrar', EstacionamentoController.encerrarEstacionamento);
}