import { configDotenv } from "dotenv";

configDotenv();

export const LISTEN_PORT = Number(process.env.LISTEN_PORT) || 3000;
export const {
  NODE_ENV,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  PROCESS_NAME,
} = process.env;

export const DB_PORT = Number(process.env.DB_PORT);
