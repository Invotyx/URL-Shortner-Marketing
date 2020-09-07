import { Router } from "express";
import * as CampaignController from "../controllers/CampaignController";
import { checkJwt } from "../middlewares/checkJwt";
import * as multer from "multer";
import * as path from 'path';
var upload = multer();



const router = Router();
router.get("/:id", [checkJwt, upload.none()], CampaignController.get);
router.get("/", [checkJwt, upload.none()] , CampaignController.getUserCampaigns);
router.post("/", [checkJwt,upload.single('attachment')] , CampaignController.create);
router.put("/:id", [checkJwt,upload.single('attachment')] , CampaignController.update);
router.delete("/:id", [checkJwt, upload.none()] , CampaignController.remove);

// Public apis
router.get("/view/:id", [upload.none()] , CampaignController.view);
export default router;