import express from "express";
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";
import { AuthMSSQLRepository } from "./components/auth/repositories/impl/mssql/auth.repository";
import { NavigatorMSSQLRepository } from "./components/navigator/repositories/impl/mssql/navigator.repository";
import { AuthService } from "./components/auth/auth.service";
import { NavigatorService } from "./components/navigator/navigator.service";

export default (app: express.Application): void => {
  const container = createContainer({
    injectionMode: "CLASSIC",
  });

  container.register({
    // repositories
    authRepository: asClass(AuthMSSQLRepository).scoped(),
    navigatorRepository: asClass(NavigatorMSSQLRepository).scoped(),

    // services
    authService: asClass(AuthService).scoped(),
    navigatorService: asClass(NavigatorService).scoped(),
  });

  app.use(scopePerRequest(container));
};
