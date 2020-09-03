import { Router } from "express";
import auth from "./auth";
import subscription from "./subscription";
import advertisement from "./advertisement";

const routes = Router();

routes.use("/auth", auth);
routes.use("/subscription", subscription);
routes.use("/advertisement", advertisement);

export default routes;
