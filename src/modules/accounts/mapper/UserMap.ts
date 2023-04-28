import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUserMapResponseDTO } from "@modules/accounts/dtos/IUserMapResponseDTO";
import { instanceToInstance } from "class-transformer";

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserMapResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };
