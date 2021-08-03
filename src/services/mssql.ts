import { ConnectionPool } from "mssql";
import * as config from "../config/database";

export const mssqlEsmad = new ConnectionPool(config.esmad).connect();
export const mssqlAuth = new ConnectionPool(config.seguridadAut).connect();
export const mssqlKactus = new ConnectionPool(config.kactus).connect();
