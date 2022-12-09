import { Category } from "../modules/cars/models/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
    return null;
  }

  findByName(name: string): Category {
    console.log(name);
    return null;
  }

  list(): Category[] {
    return null;
  }
}

export { PostgresCategoriesRepository };
