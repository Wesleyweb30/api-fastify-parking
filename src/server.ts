import fastify from "fastify";
import veiculoRoutes from "./routes/veiculoRoutes";

const app = fastify();

app.register(veiculoRoutes);

const PORT_DEV= Number(process.env.PORT_DEV);

app.listen({port: PORT_DEV}).then(()  => {
    console.log("Rodando na porta 3000")
});
