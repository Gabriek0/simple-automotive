import { Repository } from "typeorm";
import { AppDataSource } from "@shared/database/data-source";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const emailAlreadyExists = await this.repository.findOne({
      where: {
        email,
      },
    });

    return emailAlreadyExists;
  }

  async findById(id: string): Promise<User> {
    const userExists = await this.repository.findOne({
      where: {
        id,
      },
    });

    return userExists;
  }
}

export { UsersRepository };
