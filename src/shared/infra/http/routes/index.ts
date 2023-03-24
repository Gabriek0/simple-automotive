import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { categoriesRoutes } from "./categories.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { specificationsRoutes } from "./specifications.routes";
import { carsRoutes } from "./cars.routes";
import { rentalRoutes } from "./rental.routes";
import { passwordRoutes } from "./password.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/cars", carsRoutes);
router.use("/users", usersRoutes);
router.use("/rentals", rentalRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/password", passwordRoutes);

export { router };
