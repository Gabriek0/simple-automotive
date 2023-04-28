import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUserMapResponseDTO } from "@modules/accounts/dtos/IUserMapResponseDTO";

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
  }: User): IUserMapResponseDTO {
    return {
      id,
      name,
      email,
      avatar,
      driver_license,
    };
  }
}

export { UserMap };
