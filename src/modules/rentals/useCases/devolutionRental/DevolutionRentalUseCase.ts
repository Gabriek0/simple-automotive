import { inject } from "tsyringe";

// Interfaces
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

class DevolutionRentalUseCase {
  constructor(
    @inject("UsersRepository")
    private carsRepository: ICarsRepository,
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exist!");
    }

    // Verificar o tempo de aluguel
  }
}

export { DevolutionRentalUseCase };
