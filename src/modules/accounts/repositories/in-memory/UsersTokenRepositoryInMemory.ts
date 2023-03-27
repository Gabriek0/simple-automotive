import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  private usersToken: UserTokens[] = [];

  async create(props: ICreateUsersTokenDTO): Promise<UserTokens> {
    const newUserToken = new UserTokens();

    Object.assign(newUserToken, { ...props });

    this.usersToken.push(newUserToken);

    return newUserToken;
  }

  async findByUserIdAndToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const userToken = this.usersToken.find(
      (ut) => ut.user_id === userId && ut.refresh_token === refreshToken
    );

    return userToken;
  }

  async deleteById(userId: string): Promise<void> {
    const userToken = this.usersToken.find((ut) => ut.user_id === userId);

    this.usersToken.splice(this.usersToken.indexOf(userToken));
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens> {
    const userToken = this.usersToken.find(
      (user) => user.refresh_token === refreshToken
    );

    return userToken;
  }
}

export { UsersTokenRepositoryInMemory };
