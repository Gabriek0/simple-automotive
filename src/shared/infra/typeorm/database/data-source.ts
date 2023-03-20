import { DataSource } from "typeorm";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost", // database if docker, localhost if migrations.
  port: 5432,
  username: "docker",
  password: "1234",
  database:
    process.env.NODE_ENV === "test"
      ? "simple_automotive_test"
      : "simp_automotive",
  synchronize: false,
  logging: false,
  entities: [Category, Specification, User, Car, CarImage, Rental],
  migrations: ["./src/shared/infra/typeorm/database/migrations/*.ts"],
  subscribers: [],
});

export default dataSource;
