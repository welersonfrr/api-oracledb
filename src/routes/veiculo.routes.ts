import { Router } from "express";
import { VeiculoController } from "../controller/veiculo.controller";

export const veiculoRoutes = () => {
  const app = Router();

  app.get("/", new VeiculoController().getVeiculo);

  return app;
};
