import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(res: Response, req: Request): Promise<Response> {
    const { name, email, password, username, driver_license } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      username,
      driver_license,
    });

    return res.status(201).send();
  }
}

export { CreateUserController };