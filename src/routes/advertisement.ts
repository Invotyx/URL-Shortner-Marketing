import { Router } from "express";
import * as AdvertisementController from "../controllers/AdvertisementController";
import { checkJwt } from "../middlewares/checkJwt";
import * as multer from "multer";
import * as path from 'path';
import config from "../config/config";
// import { access } from "fs";
var randomize = require('randomatic');

var upload = multer();


const aws = require('aws-sdk');
aws.config.update({
  accessKeyId:config.accessKeyId ,
  secretAccessKey:config.secretAccessKey ,
  region: config.region
});

const s3 = new aws.S3();

const multerS3 = require('multer-s3');

var fileFilter = (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
}
var limits = {
    fileSize: 1024 * 1024 * 10
}
var storage = multerS3({
    s3: s3,
    bucket: 'shurly.app',
    acl: 'public-read',
    cacheControl: 'max-age=31536000',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const key = `advertisement/${req['userId']+'_'+Date.now()+'_'+randomize('Aa0', 6)+path.extname(file.originalname)}`
      cb(null, key);
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
// router.get("/get-ad-content/:id", [upload.none()] , AdvertisementController.view);

export default router;