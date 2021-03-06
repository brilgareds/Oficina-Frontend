import dotenv from "dotenv";
dotenv.config({
  path: `${__dirname}/../../.env`,
});

export const esmad = {
  server: process.env.DB_ESMAD_SERVER as string,
  database: process.env.DB_ESMAD_NAME as string,
  user: process.env.DB_ESMAD_USER as string,
  password: process.env.DB_ESMAD_PASS as string,
  //  port: parseFloat(process.env.DB_ESMAD_PORT as string),
  options: {
    enableArithAbort: true,
    encrypt: false,
    trustServerCertificate: false,
  },
};

export const seguridadAut = {
  server: process.env.DB_AUT_SERVER as string,
  database: process.env.DB_AUT_NAME as string,
  user: process.env.DB_AUT_USER as string,
  password: process.env.DB_AUT_PASS as string,
  //  port: parseFloat(process.env.DB_AUT_PORT as string),
  options: {
    enableArithAbort: true,
    encrypt: false,
    trustServerCertificate: false,
  },
};

export const kactus = {
  server: process.env.DB_KACTUS_SERVER as string,
  database: process.env.DB_KACTUS_NAME as string,
  user: process.env.DB_KACTUS_USER as string,
  password: process.env.DB_KACTUS_PASS as string,
  //  port: parseFloat(process.env.DB_KACTUS_PORT as string),
  options: {
    enableArithAbort: true,
    encrypt: false,
    trustServerCertificate: false,
  },
};

export const biplus = {
  server: process.env.DB_BIPLUS_SERVER as string,
  database: process.env.DB_BIPLUS_NAME as string,
  user: process.env.DB_BIPLUS_USER as string,
  password: process.env.DB_BIPLUS_PASS as string,
  //  port: parseFloat(process.env.DB_BIPLUS_PORT as string),
  options: {
    enableArithAbort: true,
    encrypt: false,
    trustServerCertificate: false,
  },
};

export const vum = {
  server: process.env.DB_VUM_SERVER as string,
  database: process.env.DB_VUM_NAME as string,
  user: process.env.DB_VUM_USER as string,
  password: process.env.DB_VUM_PASS as string,
  //  port: parseFloat(process.env.DB_VUM_PORT as string),
  options: {
    enableArithAbort: true,
    encrypt: false,
    trustServerCertificate: false,
  },
};
