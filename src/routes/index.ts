import { Router } from "express";
import auth from "./auth";
import subscription from "./subscription";
import advertisement from "./advertisement";
import * as multer from "multer";
var upload = multer();

const routes = Router();

routes.use("/auth",[upload.none()], auth);
routes.use("/subscription",[upload.none()], subscription);
routes.use("/advertisement", advertisement);

export default routes;
