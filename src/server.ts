import fastify from "fastify";
import VeiculoRoutes from "./routes/VeiculoRoutes";
import VagaRoutes from "./routes/VagaRoutes";
import EstacionamentoRoutes from "./routes/EstacionamentoRoutes";

const app = fastify();

app.register(VeiculoRoutes);
app.register(VagaRoutes);
app.register(EstacionamentoRoutes);

const PORT_DEV= Number(process.env.PORT_DEV);

app.listen({port: PORT_DEV}).then(()  => {
    console.log("Rodando na porta 3000")
});
