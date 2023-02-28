import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

const rental = {
  user_id: "12345",
  car_id: "55555",
  expected_return_date: new Date(),
};

const rental2 = {
  user_id: "12345",
  car_id: "55555",
  expected_return_date: new Date(),
};

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const createdRental = await createRentalUseCase.execute(rental);

    expect(createdRental).toHaveProperty("id");
    expect(createdRental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        ...rental,
        user_id: "123",
      });

      await createRentalUseCase.execute({
        ...rental2,
        user_id: "321",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
