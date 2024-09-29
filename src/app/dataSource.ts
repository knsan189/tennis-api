import { DataSource } from "typeorm";

const AppDateSource = new DataSource({
  type: "mariadb",
  host: "192.168.0.83",
  port: 3308,
  username: "jin",
  password: "dhswja95",
  database: "tennis",
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: [
    `${
      process.env.NODE_ENV === "development" ? "src" : "dist"
    }/**/entities/*.entity.{ts,js}`,
  ],
});

export default AppDateSource;
