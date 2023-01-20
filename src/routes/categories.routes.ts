import multer from "multer";
import { Request, Response, Router } from "express";

// Modules

import { listCategoryController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "tmp/",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (req: Request, res: Response) => {
  return listCategoryController.handle(req, res);
});

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  (req: Request, res: Response) => {
    return importCategoryController.handle(req, res);
  }
);

export { categoriesRoutes };
