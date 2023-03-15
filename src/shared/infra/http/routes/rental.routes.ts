import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsController } from "@modules/rentals/useCases/listRentals/ListRentalsController";

const rentalRoutes = Router();

const listRentalsController = new ListRentalsController();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

rentalRoutes.get("/:user", ensureAuthenticated, listRentalsController.handle);

export { rentalRoutes };
