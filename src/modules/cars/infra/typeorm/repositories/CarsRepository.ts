import { Car } from "../entities/Car";

import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import appDataSource from "@shared/infra/typeorm/database";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = appDataSource.getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }

  async findByLicense(license: string): Promise<Car> {
    const car = await this.repository.findOneBy({
      license_plate: license,
    });

    return car;
  }

  async findAvailable(): Promise<Car[]> {
    const cars = await this.repository.find();

    return cars;
  }
}

export { CarsRepository };
