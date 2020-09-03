import { Router } from "express";
import * as AdvertisementController from "../controllers/AdvertisementController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
router.get("/:id", [checkJwt], AdvertisementController.get);
router.get("/", [checkJwt] , AdvertisementController.getUserAds);
router.post("/", [checkJwt] , AdvertisementController.create);
router.put("/:id", [checkJwt] , AdvertisementController.update);
router.delete("/:id", [checkJwt] , AdvertisementController.remove);

export default router;