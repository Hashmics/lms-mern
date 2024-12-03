import express from 'express'
import { getUserProfile, login, logout, register, updateUserProfile } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateUserProfile)


export default router;