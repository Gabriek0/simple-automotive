import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
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

const car2 = {
  id: "222",
  available: true,
  name: "Name car2",
  description: "Description car2",
  daily_rate: 140,
  fine_amount: 80,
  license_plate: "BAC-9134",
  brand: "Brand car2",
  category_id: "2",
};

describe("List Cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepository);
  });

  it("should be able to list all available cars", async () => {
    await carsRepository.create(car);

    await carsRepository.create(car2);

    const cars = await listCarsUseCase.execute({});

    expect(cars).toHaveLength(2);
  });

  it("should be able to list all abailable cars by name", async () => {
    await carsRepository.create(car);
    await carsRepository.create(car2);

    const carsByName = await listCarsUseCase.execute({
      name: "Name car2",
    });

    expect(carsByName).toEqual([car2]);
  });

  it("should be able to list all abailable cars by brand", async () => {
    await carsRepository.create(car);
    await carsRepository.create(car2);

    const carsByName = await listCarsUseCase.execute({
      brand: "Brand car2",
    });

    expect(carsByName).toEqual([car2]);
  });

  it("should be able to list all abailable cars by category_id", async () => {
    await carsRepository.create(car);
    await carsRepository.create(car2);

    const carsByName = await listCarsUseCase.execute({
      category_id: "2",
    });

    expect(carsByName).toEqual([car2]);
  });
});
