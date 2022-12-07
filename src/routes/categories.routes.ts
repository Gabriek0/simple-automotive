import { Request, Response, Router } from "express";
import { Category } from "../models/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

const categories = [];

categoriesRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;

  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

export { categoriesRoutes };
