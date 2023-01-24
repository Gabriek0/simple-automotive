import { Request, Response } from "express";

import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

import { container } from "tsyringe";

class CreateSpecificationsController {
  handle(req: Request, res: Response) {
    const { name, description } = req.body;

    const createSpecificationsUseCase = container.resolve(
      CreateSpecificationsUseCase
    );
    createSpecificationsUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateSpecificationsController };
