import { container } from "tsyringe";
import { Request, Response } from "express";
import { IFindAvailableCarDTO } from "@modules/cars/dtos/IFindAvailableCarDTO";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response) {
    const { name, brand, category_id } = request.query as IFindAvailableCarDTO;

    const findAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await findAvailableCarsUseCase.execute({
      name,
      brand,
      category_id,
    });

    return response.json(cars);
  }
}

export { ListAvailableCarsController };
