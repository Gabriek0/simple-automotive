import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoryUseCase";

class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoriesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const categories = await this.listCategoryUseCase.execute();

    return res.json(categories);
  }
}

export { ListCategoriesController };
