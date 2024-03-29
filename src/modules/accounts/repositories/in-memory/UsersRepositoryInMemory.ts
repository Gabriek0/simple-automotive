import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  public users: User[] = [];

  async create({ name, email, password, driver_license }: ICreateUserDTO) {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
    });

    this.users.push(user);
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
}

export { UsersRepositoryInMemory };
