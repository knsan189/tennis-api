import { DataSource } from "typeorm";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  NODE_ENV,
} from "../config/const";

const AppDateSource = new DataSource({
  type: "mariadb",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: NODE_ENV === "development",
  entities: [
    `${
      NODE_ENV === "development" ? "src" : "dist"
    }/**/entities/*.entity.{ts,js}`,
  ],
});

export default AppDateSource;
