import { Router } from "express";
import { createInfo,deleteInfo,listAllInfoPosts } from "../controllers/info.controller.js";

const router=Router();

router.route("/create").post(createInfo)
router.route("/delete").post(deleteInfo)
router.route("listinfo").post(listAllInfoPosts)

export default router