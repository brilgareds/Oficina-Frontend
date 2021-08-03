import express from "express";
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";

export default (app: express.Application): void => {
  const container = createContainer({
    injectionMode: "CLASSIC",
  });

  container.register({
    // repositories
    // services
  });

  app.use(scopePerRequest(container));
};
