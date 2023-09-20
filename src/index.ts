import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { orderRoutes } from "./routes/order.routes";
import { veiculoRoutes } from "./routes/veiculo.routes";

dotenv.config();

// Porta do servidor
const PORT = process.env.DB_PORT || 4000;
// Host do servidor
const HOSTNAME = process.env.DB_HOST || "http://localhost";
// App Express
const app = express();
// Endpoint raiz
app.get("/", (req, res) => {
  res.send("Bem-vindo!");
});
// Cors
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  })
);

app.use("/order", orderRoutes());
app.use("/veiculo", veiculoRoutes());

// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
  res.status(404);
});
// Inicia o sevidor
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});
