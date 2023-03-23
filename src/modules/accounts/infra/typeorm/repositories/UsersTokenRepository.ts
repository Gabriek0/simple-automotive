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

  async findByUserIdAndToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      where: {
        user_id: userId,
        refresh_token: refreshToken,
      },
    });

    return userToken;
  }

  async deleteById(userId: string): Promise<void> {
    await this.repository.delete(userId);
  }
}

export { UsersTokenRepository };
