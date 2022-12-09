import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationNameAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationNameAlreadyExists) {
      throw new Error("Specification name already exists");
    }

    this.specificationRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationService };
