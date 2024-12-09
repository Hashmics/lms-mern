import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from './../utils/multer.js';
import {
    createCourse,
    getCreatorCourses,
    updateCourse
} from '../controllers/courseController.js';


const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), updateCourse);


export default router;