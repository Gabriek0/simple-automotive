import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoryUseCase";

class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response) {
    const categories = this.listCategoryUseCase.execute();

    return res.json(categories);
  }
}

export { ListCategoriesController };
