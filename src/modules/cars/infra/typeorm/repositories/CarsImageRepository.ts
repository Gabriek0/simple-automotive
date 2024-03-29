import { Repository } from "typeorm";
import { ICarsImageDTO } from "@modules/cars/dtos/ICarsImageDTO";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { CarImage } from "../entities/CarImage";
import dataSource from "@shared/infra/typeorm/database/data-source";

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = dataSource.getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICarsImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImageRepository };
