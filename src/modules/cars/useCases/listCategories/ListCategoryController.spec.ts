import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";

import request from "supertest";

import { DataSource } from "typeorm";
import createConnection from "@shared/infra/typeorm/database";

let connection: DataSource;

describe("List Category Controller", () => {
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

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category test",
        description: "Category test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category test");
  });
});
