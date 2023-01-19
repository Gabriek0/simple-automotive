import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "simp_automotive",
  synchronize: true,
  logging: true,
  migrations: ["./src/database/migrations/*.ts"],
  entities: [Category],
  subscribers: [],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
