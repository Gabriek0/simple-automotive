import { Repository } from "typeorm";
import { ICarsImageDTO } from "@modules/cars/dtos/ICarsImageDTO";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { CarImage } from "../entities/CarImage";
import appDataSource from "@shared/infra/typeorm/database";

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = appDataSource.getRepository(CarImage);
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
