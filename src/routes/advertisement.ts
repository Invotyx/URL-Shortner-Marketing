import { Router } from "express";
import * as AdvertisementController from "../controllers/AdvertisementController";
import { checkJwt } from "../middlewares/checkJwt";
import * as multer from "multer";
import * as path from 'path';
var upload = multer();

var fileFilter = (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
}
var limits = {
    fileSize: 1024 * 1024
}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/'+'advertisement'+'/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})
var upload = multer({storage:storage, fileFilter:fileFilter, limits:limits});

const router = Router();
router.get("/:id", [checkJwt, upload.none()], AdvertisementController.get);
router.get("/", [checkJwt, upload.none()] , AdvertisementController.getUserAds);
router.post("/", [checkJwt,upload.single('attachment')] , AdvertisementController.create);
router.put("/:id", [checkJwt,upload.single('attachment')] , AdvertisementController.update);
router.delete("/:id", [checkJwt, upload.none()] , AdvertisementController.remove);

//public
router.get("/view/:id", [upload.none()] , AdvertisementController.view);

export default router;