import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IFindAvailableCarDTO } from "../dtos/IFindAvailableCarDTO";

import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicense(license: string): Promise<Car>;
  findAvailable(data: IFindAvailableCarDTO): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
}

export { ICarsRepository };
