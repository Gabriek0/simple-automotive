import { Request, Response } from "express";

import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

import { container } from "tsyringe";

class CreateSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createSpecificationsUseCase = container.resolve(
      CreateSpecificationsUseCase
    );

    await createSpecificationsUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateSpecificationsController };
