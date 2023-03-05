import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IFindAvailableCarDTO } from "../dtos/IFindAvailableCarDTO";

import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findById(car_id: string): Promise<Car>;
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicense(license: string): Promise<Car>;
  findAvailable(data: IFindAvailableCarDTO): Promise<Car[]>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
