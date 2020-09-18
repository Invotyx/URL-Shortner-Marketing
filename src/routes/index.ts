import { Router } from "express";
import auth from "./auth";
import subscription from "./subscription";
import advertisement from "./advertisement";
import campaigns from "./campaigns";
import device from "./device";
import * as AdvertisementController from "../controllers/AdvertisementController";

import * as multer from "multer";
var upload = multer();

const routes = Router();

routes.use("/auth",[upload.none()], auth);
routes.use("/subscription",[upload.none()], subscription);
routes.use("/advertisement", advertisement);
routes.use("/content/:id",[ upload.none()], AdvertisementController.view);
routes.use("/campaign", campaigns);
routes.use("/device", device);

export default routes;
