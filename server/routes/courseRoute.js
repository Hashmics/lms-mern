import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from './../utils/multer.js';
import {
    createCourse,
    createLecture,
    getCourseById,
    getCourseLecture,
    getCreatorCourses,
    updateCourse
} from '../controllers/courseController.js';


const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), updateCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);


export default router;