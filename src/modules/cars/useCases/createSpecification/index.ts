import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecficiationsController } from "./CreateSpecificationsController";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

const specificationsRepository = SpecificationsRepository.getInstance();
const createSpecificationsUseCase = new CreateSpecificationsUseCase(
  specificationsRepository
);
const createSpecificationsController = new CreateSpecficiationsController(
  createSpecificationsUseCase
);

export { createSpecificationsController };
