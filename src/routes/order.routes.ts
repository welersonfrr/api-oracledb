import { Router } from "express";
import { OrderController } from "../controller/order.controller";

export const orderRoutes = () => {
  const app = Router();

  app.get("/", new OrderController().getOrder);

  return app;
};
