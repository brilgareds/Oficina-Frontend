import dotenv from "dotenv";
dotenv.config({
  path: `${__dirname}/../../.env`,
});

export const azure = {
  account: process.env.AZURE_BLOB_ACCOUNT as string,
  container: process.env.AZURE_BLOB_CONTAINER as string,
  key: process.env.AZURE_BLOB_KEY as string,
};
