import { Router } from "express";
import * as AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import * as multer from "multer";
var upload = multer();

const router = Router();
//Login route
router.post("/logout", [checkJwt],AuthController.logout);
router.post("/login", AuthController.login);



export default router;