import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import { AppDataSource } from "@shared/database/data-source";

// get a new connection
const dataSource = AppDataSource("localhost");

async function create() {
  const id = uuid();
  const password = await hash("admin", 8);

  dataSource
    .initialize()
    .then(() => {
      dataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.query(
          `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', now(), 'XXXXXX')
    `
        );
      });

      console.log("User admin created!");
    })
    .catch((err) => {
      console.log("Error during Data Source initialization", err);
    });
}

create();
