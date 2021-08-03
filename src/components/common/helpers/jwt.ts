import jwt from "jsonwebtoken";
import { access_token_secret, refresh_token_secret } from "../../../config/jwt";

export const signAccessToken = (payload: any) => {
  const jwtSecret = access_token_secret;

  if (!jwtSecret) {
    throw new Error("key no asignada");
  }

  return jwt.sign(payload, jwtSecret, { expiresIn: "30m" });
};

export const signRefreshToken = (payload: any) => {
  const jwtSecret = refresh_token_secret;

  if (!jwtSecret) {
    throw new Error("key no asignada");
  }

  return jwt.sign(payload, jwtSecret, { expiresIn: "7d" });
};
