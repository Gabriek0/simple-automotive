import { ICreateUsersTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokenRepository {
  create(props: ICreateUsersTokenDTO): Promise<UserTokens>;
}

export { IUsersTokenRepository };
