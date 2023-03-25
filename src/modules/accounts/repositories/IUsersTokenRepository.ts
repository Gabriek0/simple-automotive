import { UserTokens } from "../infra/typeorm/entities/UserTokens";

import { ICreateUsersTokenDTO } from "../dtos/ICreateUserTokenDTO";

interface IUsersTokenRepository {
  create(props: ICreateUsersTokenDTO): Promise<UserTokens>;
  findByUserIdAndToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens>;
  deleteById(userId: string): Promise<void>;
  findByRefreshToken(refreshToken: string): Promise<UserTokens>;
}

export { IUsersTokenRepository };
