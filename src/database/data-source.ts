import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "simp_automotive",
  synchronize: true,
  logging: true,
  // migrations: ["./src/database/migrations/*.ts"],
  // entities: ["./src/modules/**/entities/*.ts"]
});
