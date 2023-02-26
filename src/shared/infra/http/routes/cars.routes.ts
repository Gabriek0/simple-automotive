import multer from "multer";
import { Router } from "express";

import uploadConfig from "@config/upload";

// Controllers
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

// Middlewares
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const upload = multer(uploadConfig.upload("./tmp/cars"));

const uploadCarImage = new UploadCarImageController();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

const carsRoutes = Router();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImage.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
