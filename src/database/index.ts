import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log("Initializing the database...");
  })
  .catch((err) => console.log(err));
