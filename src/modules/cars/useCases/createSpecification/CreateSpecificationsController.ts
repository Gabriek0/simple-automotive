import { Request, Response } from "express";

import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

class CreateSpecficiationsController {
  constructor(
    private createSpecificationsUseCase: CreateSpecificationsUseCase
  ) {}

  handler(req: Request, res: Response) {
    const { name, description } = req.body;

    this.createSpecificationsUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateSpecficiationsController };
