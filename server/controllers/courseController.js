import { Course } from "../models/courseModel.js";

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
}