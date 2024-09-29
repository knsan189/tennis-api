import { DataSource } from "typeorm";

const { NODE_ENV, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
  process.env;

const AppDateSource = new DataSource({
  type: "mariadb",
  host: DB_HOST,
  port: Number(DB_PORT),
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
