import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { access_token_secret, refresh_token_secret } from "../../../config/jwt";
import { JwtUserPayload } from "../interfaces/jwtUserPayload";
import { JwtUserPayloadExternal } from "../interfaces/jwtUserPayloadExternal";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req.headers["authorization"] || "";
    if (!token.startsWith("Bearer ")) {
      throw new Error("invalid token");
    }

    const tokenSanitized = token.replace("Bearer ", "");
    const user = jwt.verify(
      tokenSanitized,
      access_token_secret
    ) as JwtUserPayload;

    req.user = {
      name: user.name,
      last_name: user.last_name,
      identification: user.identification,
      status: user.status,
      company: user.company,
    };

    next();
  } catch (err) {
    res.status(402).json({ message: err.message });
  }
};

export const verifyJwtExternal = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req.headers["authorization"] || "";
    if (!token.startsWith("Bearer ")) {
      throw new Error("invalid token");
    }

    const tokenSanitized = token.replace("Bearer ", "");
    const user = jwt.verify(
      tokenSanitized,
      access_token_secret
    ) as JwtUserPayloadExternal;

    console.log("user token", user);

    req.user = {
      name: user.name,
      last_name: user.last_name,
      identification: user.identification,
      externo: user.externo,
      status: user.status,
      company: user.company,
    };

    next();
  } catch (err) {
    res.status(402).json({ message: err.message });
  }
};

export const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.headers["authorization"] || "";
    if (!token.startsWith("Bearer ")) {
      throw new Error("invalid token");
    }

    const tokenSanitized = token.replace("Bearer ", "");
    const user = jwt.verify(
      tokenSanitized,
      refresh_token_secret
    ) as JwtUserPayload;

    req.user = {
      name: user.name,
      last_name: user.last_name,
      identification: user.identification,
      status: user.status,
      company: user.company,
    };

    next();
  } catch (err) {
    res.status(402).json({ message: err.message });
  }
};
