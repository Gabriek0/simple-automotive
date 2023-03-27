import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";

import request from "supertest";

import { DataSource } from "typeorm";
import createConnection from "@shared/infra/typeorm/database";

let connection: DataSource;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection("localhost");

    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', now(), 'XXXXXX')
  `
      );
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category test",
        description: "Category test",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.statusCode).toBe(201);
  });

  it("should be able to create a new category with same exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category test",
        description: "Category test",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.statusCode).toBe(400);
  });
});
