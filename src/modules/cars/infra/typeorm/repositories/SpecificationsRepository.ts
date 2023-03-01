import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { In, Repository } from "typeorm";

import { dataSource } from "@shared/infra/typeorm/database/data-source";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = dataSource.getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    return await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: {
        name,
      },
    });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    /*
    const specifications = await this.repository
      .createQueryBuilder("specification")
      .where("specification.id IN (:...ids)", { ids })
      .getMany();
    */

    const specifications = await this.repository.find({
      where: {
        id: In(ids),
      },
    });

    return specifications;
  }
}

export { SpecificationsRepository };
