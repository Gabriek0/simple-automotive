import { Router, Response, Request } from "express";
import { createSpecificationsController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req: Request, res: Response) => {
  return createSpecificationsController.handler(req, res);
});

export { specificationsRoutes };
