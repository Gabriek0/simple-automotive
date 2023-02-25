import { AppError } from "@shared/errors/AppError";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

const car = {
  name: "Name car",
  description: "Description",
  daily_rate: 100,
  fine_amount: 50,
  license_plate: "ABC-1234",
  brand: "Brand",
  category_id: "1",
};

const specification1 = {
  id: "1",
  name: "Specification 1",
  description: "Specification 1",
};

const specification2 = {
  id: "2",
  name: "Specification 2",
  description: "Specification 2",
};

describe("Create Car Specificaiton", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const carCreated = await carsRepositoryInMemory.create(car);

    const specification1Created = await specificationsRepositoryInMemory.create(
      specification1
    );
    const specification2Created = await specificationsRepositoryInMemory.create(
      specification2
    );

    const specifications_id = [
      specification1Created.id,
      specification2Created.id,
    ];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: carCreated.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications).toHaveLength(2);
  });

  it("should not be able to add a new specification to a now-existent car", async () => {
    expect(async () => {
      const car_id = "12345";
      const specifications_id = ["54321"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
