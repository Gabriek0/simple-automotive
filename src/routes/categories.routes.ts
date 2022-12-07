import { Request, Response, Router } from "express";
import { Category } from "../models/Category";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;

  const category = new Category();

  Object.assign(category, { name, description });

  categories.push(category);

  return res.status(201).json(category);
});

export { categoriesRoutes };
