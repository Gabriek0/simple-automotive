import { ICreateUsersTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokenRepository {
  create(props: ICreateUsersTokenDTO): Promise<UserTokens>;
  findByUserIdAndToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens>;
  deleteById(userId: string): Promise<void>;
}

export { IUsersTokenRepository };
