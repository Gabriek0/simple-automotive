import "reflect-metadata";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

const car = {
  name: "Name car",
  description: "Description",
  daily_rate: 100,
  fine_amount: 50,
  license_plate: "ABC-1234",
  brand: "Brand",
  category_id: "1",
};

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute(car);

      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with available true by default", async () => {
    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated.available).toBe(true);
  });
});
