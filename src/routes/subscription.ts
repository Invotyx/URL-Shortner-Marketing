import { Router } from "express";
import * as Subcription from "../controllers/SubscriptionController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Login route
router.get("/get", [checkJwt], Subcription.get);


export default router;