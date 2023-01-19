import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "simp_automotive",
  // synchronize: true,
  logging: true,
  migrations: ["./src/database/migrations/*.ts"],
  entities: [Category],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Initializng the database...");
  })
  .catch((err) => console.log(err));
