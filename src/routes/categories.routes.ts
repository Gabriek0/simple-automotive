import { Request, Response, Router } from "express";
import { Category } from "../models/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;

  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get("/", (req: Request, res: Response) => {
  const categories = categoriesRepository.list();

  return res.json(categories);
});

export { categoriesRoutes };
