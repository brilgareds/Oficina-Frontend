import dotenv from "dotenv";
dotenv.config({
  path: `${__dirname}/../../.env`,
});

export const access_token_secret = process.env.ACCESS_TOKEN_SECRET as string;
export const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET as string;
