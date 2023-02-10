import { AppError } from "../../../errors/AppError";
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
      throw new AppError("Specification name already exists");
    }

    this.specificationRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationService };
