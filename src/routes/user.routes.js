import { Router } from "express";
import { registerUser,loginUser,changeCurrentPassword ,updateUserDetails,updateImage} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router=Router();


router.route('/register').post(upload.single("image"),registerUser)
router.route('/login').post(loginUser)
router.route('/change').post(changeCurrentPassword)
router.route('/update').post(updateUserDetails)
router.route('/updateimage').post(upload.single("image"),updateImage)
export default router;