import { container } from "tsyringe";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";

// 1. Pass ICategoryRepository to within Sigleton
// 2. When we call the record below, the injection will happen

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);
