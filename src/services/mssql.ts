import { ConnectionPool } from "mssql";
import { esmad, kactus, seguridadAut, biplus, vum } from "../config/database";

export const mssqlEsmad = new ConnectionPool(esmad).connect();
export const mssqlAuth = new ConnectionPool(seguridadAut).connect();
export const mssqlKactus = new ConnectionPool(kactus).connect();
export const mssqlBiplus = new ConnectionPool(biplus).connect();
export const mssqlVum = new ConnectionPool(vum).connect();
