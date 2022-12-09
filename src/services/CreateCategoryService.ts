import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  /**
   *
   * [] - Definir o tipo de retorno
   * [x] - Alterar o retorno de erro
   * [x] - Acessar o repositorio
   * [] - Retornar algo
   *
   */

  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    // Dependency Inversion Principle:
    // X const categoriesRepository = new CategoriesRepository();

    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
