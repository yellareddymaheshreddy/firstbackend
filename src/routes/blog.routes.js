import { Router } from "express";
import { createBlog,deleteBlog,listAllBlogs } from "../controllers/blog.controller.js";
const router=Router();

router.route("/create").post(createBlog)
router.route("/delete").post(deleteBlog)
router.route("/listall").post(listAllBlogs)

export default router
