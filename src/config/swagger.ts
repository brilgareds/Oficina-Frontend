import { appUrl } from "./app";

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vum Service API",
      version: "1.0.0",
    },
    servers: [
      {
        url: appUrl,
      },
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  apis: ["./src/components/**/*.controller.ts"],
};
