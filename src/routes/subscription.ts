import { Router } from "express";
import * as Subcription from "../controllers/SubscriptionController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Login route
router.get("/get", [checkJwt], Subcription.get);
router.post("/create", [checkJwt], Subcription.create);


export default router;