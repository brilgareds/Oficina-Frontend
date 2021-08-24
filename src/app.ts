import express from "express";
import dotenv = require("dotenv");
import cors from "cors";
import morgan from "morgan";
import { loadControllers } from "awilix-express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import loadContainer from "./container";
import { options } from "./config/swagger";

export async function startServer() {
  const app = express();
  const swaggerSpects = swaggerJsDoc(options);

  dotenv.config({
    path: `${__dirname}/../.env`,
  });

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpects));

  loadContainer(app);
  app.use(
    loadControllers("./components/**/*.controller.{ts,js}", { cwd: __dirname })
  );

  return app;
}
