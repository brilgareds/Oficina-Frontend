export const esmad = {
  server: process.env.DB_ESMAD_SERVER as string,
  database: process.env.DB_ESMAD_NAME as string,
  user: process.env.DB_ESMAD_USER as string,
  password: process.env.DB_ESMAD_PASS as string,
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
  options: {
    enableArithAbort: true,
    encrypt: false,
    trustServerCertificate: false,
  },
};
