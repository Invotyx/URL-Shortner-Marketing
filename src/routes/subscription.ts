import { Router } from "express";
import * as Subcription from "../controllers/SubscriptionController";
import { checkJwt } from "../middlewares/checkJwt";
import * as multer from "multer";
var upload = multer();

const router = Router();
//Login route
router.get("/get", [checkJwt], Subcription.get);
router.post("/create", [checkJwt], Subcription.create);
router.post("/ios_subscription_updates", Subcription.ios_subscription_updates);
router.post("/android_subscription_updates", Subcription.android_subscription_updates);


export default router;
