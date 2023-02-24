import { ICarsRepository } from "../ICarsRepository";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

// Entities
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      ...data,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicense(license: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license);

    return car;
  }

  async findAvailable(): Promise<Car[]> {
    const cars = this.cars.filter((car) => car.available === true);

    return cars;
  }
}

export { CarsRepositoryInMemory };
