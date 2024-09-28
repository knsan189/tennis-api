import { DataSource } from "typeorm";

const AppDateSource = new DataSource({
  type: "mariadb",
  host: "192.168.0.83",
  port: 3308,
  username: "jin",
  password: "dhswja95",
  database: "tennis",
  synchronize: true,
  logging: true,
  entities: ["src/**/entities/*.entity.ts"],
});

export default AppDateSource;
