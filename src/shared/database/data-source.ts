import { DataSource } from "typeorm";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

export const AppDataSource = (host = "database"): DataSource => {
  const dataSource = new DataSource({
    type: "postgres",
    host, // database if docker, localhost if migrations.
    port: 5432,
    username: "docker",
    password: "1234",
    database: "simp_automotive",
    synchronize: false,
    logging: true,
    migrations: ["./src/shared/database/migrations/*.ts"],
    entities: [Category, Specification, User, Car],
    subscribers: [],
  });

  return dataSource;
};
