export const port = (process.env.PORT as string) || "3000";

export const appUrl =
  (process.env.APP_URL as string) || `http://localhost:${port}`;
