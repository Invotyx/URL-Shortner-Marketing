import { Router } from "express";
import auth from "./auth";
import subscription from "./subscription";

const routes = Router();

routes.use("/auth", auth);

routes.use("/subscription", subscription);

export default routes;
