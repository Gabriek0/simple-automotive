import { Router } from "express";

import { SendForgotPasswordMailController } from "@modules/accounts/useCases/forgotPassword/SendForgotPasswordMailController";
import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUseController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
