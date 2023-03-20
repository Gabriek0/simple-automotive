import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import createConnection from "../database";

// get a new connection
const dataSource = createConnection("localhost");

async function create() {
  const id = uuid();
  const password = await hash("admin", 8);

  (await dataSource)
    .transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', now(), 'XXXXXX')
    `
      );

      console.log("User admin created!");
    })
    .catch((err) => {
      console.log("Error during Data Source initialization", err);
    });
}

create();
