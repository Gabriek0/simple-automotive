import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import dataSource from "@shared/infra/typeorm/database/data-source";
import { Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = dataSource.getRepository(UserTokens);
  }

  async create(props: ICreateUsersTokenDTO): Promise<UserTokens> {
    const userTokens = this.repository.create(props);
    await this.repository.save(userTokens);

    return userTokens;
  }
}

export { UsersTokenRepository };
