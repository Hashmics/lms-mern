import { Course } from "../models/courseModel.js";
import { deleteMedia } from '../utils/cloudinary.js'
import { uploadMedia } from './../utils/cloudinary.js';
import { Lecture } from './../models/lectureModel.js';

export const createCourse = async (req, res) => {
    try {

        const { courseTitle, category } = req.body;
        if (!courseTitle || !category) {
            return res.status(400).json({
                success: false,
                message: "Course title and category are required"
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        });

        return res.status(201).json({
            success: true,
            course,
            message: 'Course Created SuccessFully'
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error creating course",
        })
    }
};

export const getCreatorCourses = async (req, res) => {
    try {

        const userId = req.id;
        const courses = await Course.find({ creator: userId });
        if (!courses) {
            return res.status(404).json({
                success: false,
                message: "No courses found for this user"
            });
        };

        return res.status(200).json({
            courses
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error Fetching Creator course",
        })
    }
};

export const updateCourse = async (req, res) => {
    try {

        const courseId = req.params.courseId;
        const {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice
        } = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        };

        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split('/').pop().split('.')[0];
                await deleteMedia(publicId);
            }
            courseThumbnail = await uploadMedia(thumbnail.path)
        };

        const updateData = {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail: courseThumbnail?.secure_url
        }

        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

        return res.status(200).json({
            success: true,
            course,
            message: "Course updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error Updating course",
        })
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            course
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error Fetching course",
        })
    }
};

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Lecture title and course ID are required"
            });
        }

        const lecture = await Lecture.create({ lectureTitle });
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        course.lectures.push(lecture._id);
        await course.save();

        return res.status(201).json({
            success: true,
            lecture,
            message: "Lecture Created Successfully"
        });
    } catch (error) {
        console.error("Error creating lecture:", error); // Log the entire error object
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message // Include the error message in the response for debugging
        });
    }
};

export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate("lectures");
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        };

        return res.status(200).json({
            success: true,
            lectures: course.lectures
        });

    } catch (error) {
        console.error("Error getting lecture:", error); // Log the entire error object
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message // Include the error message in the response for debugging
        });
    }
};