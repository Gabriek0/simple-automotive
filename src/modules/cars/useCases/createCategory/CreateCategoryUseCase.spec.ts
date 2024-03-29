import "reflect-metadata";

import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { AppError } from "@shared/errors/AppError";

let createCategoryUseCase: CreateCategoryUseCase;

// we will have create a in memory repository
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

interface IRequest {
  name: string;
  description: string;
}

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category: IRequest = {
      name: "Category name test",
      description: "Category description test",
    };

    // create a new category with useCase
    await createCategoryUseCase.execute(category);

    // then search for the category name created
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    // console.log(categoryCreated);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with same name", async () => {
    const category: IRequest = {
      name: "Category name test",
      description: "Category description test",
    };

    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError("Category already exists!")
    );
  });
});
