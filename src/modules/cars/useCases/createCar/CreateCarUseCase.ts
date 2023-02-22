import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  category_id: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  brand: string;
}

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    brand,
    daily_rate,
    description,
    fine_amount,
    category_id,
    license_plate,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicense(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    return car;
  }
}

export { CreateCarUseCase };
