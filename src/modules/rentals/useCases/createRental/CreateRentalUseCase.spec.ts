import "reflect-metadata";

import dayjs from "dayjs";

import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let dayJsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let carsRepository: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

const dayAdd24Hours = dayjs().add(1, "day").toDate();

const rental = {
  user_id: "12345",
  car_id: "55555",
  expected_return_date: dayAdd24Hours,
};

const rental2 = {
  user_id: "12345",
  car_id: "55555",
  expected_return_date: dayAdd24Hours,
};

describe("Create Rental", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      name: "Test",
      brand: "Test",
      category_id: "123",
      daily_rate: 100,
      description: "Test",
      fine_amount: 40,
      license_plate: "Test",
    });

    const createdRental = await createRentalUseCase.execute({
      ...rental,
      car_id: car.id,
    });

    expect(createdRental).toHaveProperty("id");
    expect(createdRental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      ...rental,
      user_id: "12345",
      car_id: "321",
    });

    await expect(
      createRentalUseCase.execute({
        ...rental2,
        user_id: "12345",
        car_id: "110",
      })
    ).rejects.toEqual(new AppError(`There's a rental in progress for user!`));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      ...rental,
      user_id: "123",
      car_id: "111",
    });

    await expect(
      createRentalUseCase.execute({
        ...rental2,
        user_id: "222",
        car_id: "111",
      })
    ).rejects.toEqual(new AppError("Car is unavailable!"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        ...rental,
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
