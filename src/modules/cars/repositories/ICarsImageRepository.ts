import { ICarsImageDTO } from "../dtos/ICarsImageDTO";

import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImageRepository {
  create(data: ICarsImageDTO): Promise<CarImage>;
}

export { ICarsImageRepository };
