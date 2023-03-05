import { Car } from "../entities/Car";

import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { IFindAvailableCarDTO } from "@modules/cars/dtos/IFindAvailableCarDTO";
import { dataSource } from "@shared/infra/typeorm/database/data-source";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
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

  async findAvailable({
    name,
    brand,
    category_id,
  }: IFindAvailableCarDTO): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("car")
      .where("available = :available", { available: true });

    if (name) {
      carsQuery.andWhere("car.name = :name", { name });
    }

    if (brand) {
      carsQuery.andWhere("car.brand = :brand", { brand });
    }

    if (category_id) {
      carsQuery.andWhere("car.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        id: car_id,
      },
    });

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({
        available,
      })
      .where("id = :id", {
        id,
      })
      .execute();
  }
}

export { CarsRepository };
