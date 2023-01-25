import { DataSource } from "typeorm";
import { User } from "../modules/accounts/entities/User";

import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";

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
  entities: [Category, Specification, User],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Initializing the database...");
  })
  .catch((err) => console.log(err));
