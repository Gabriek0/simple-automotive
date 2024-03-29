import { ICarsRepository } from "../ICarsRepository";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

// Entities
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { IFindAvailableCarDTO } from "@modules/cars/dtos/IFindAvailableCarDTO";

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

  async findAvailable({
    name,
    brand,
    category_id,
  }: IFindAvailableCarDTO): Promise<Car[]> {
    let availableCars = this.cars.filter((car) => car.available);

    if (!name && !brand && !category_id) return availableCars;

    availableCars = availableCars.filter((car) => {
      if (car.name === name) return true;
      if (car.brand === brand) return true;
      if (car.category_id === category_id) return true;

      return false;
    });

    return availableCars;
  }

  async findById(car_id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === car_id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((c) => c.id === id);
    this.cars[carIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
