import { configDotenv } from "dotenv";

configDotenv();

export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;
