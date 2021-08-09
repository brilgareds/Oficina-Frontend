import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import * as express from "express";

function validationMiddleware<T>(type: any): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => {
          return {
            property: error.property,
            constraints: Object.values(error.constraints!),
          };
        });

        res.status(422).json(message);
      } else {
        next();
      }
    });
  };
}

export default validationMiddleware;
