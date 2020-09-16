import { Router } from "express";
import * as DeviceController from "../controllers/DeviceController";
import {checkJwt} from '../middlewares/checkJwt';
import * as multer from "multer";
var upload = multer();

const router = Router();
//Add user device
router.post("/",[checkJwt, upload.none()], DeviceController.create);

export default router;