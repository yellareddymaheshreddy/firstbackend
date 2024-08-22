import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createConfession ,deleteConfession,listAllConfessions} from "../controllers/confesssion.controller.js";


const router=Router();
router.route("/create").post(upload.single("image"),createConfession)
router.route("/delete").post(deleteConfession)
router.route("/confessions").post(listAllConfessions)

export default router