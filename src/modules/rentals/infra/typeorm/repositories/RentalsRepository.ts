import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import dataSource from "@shared/infra/typeorm/database/data-source";
import { Repository } from "typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = dataSource.getRepository(Rental);
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });

    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository
      .createQueryBuilder("")
      .where("user_id = :user_id", { user_id })
      .andWhere("end_date IS NULL")
      .getOne();

    return openByUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOneBy({
      id,
    });

    return rental;
  }

  async findByUser(id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: {
        user_id: id,
      },
      relations: {
        car: true,
      },
    });

    return rentals;
  }
}

export { RentalsRepository };
