import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["instructor", "student"],
        default: "student"
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    photoURL: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fctmirror.org%2Fdummy-man-570x570%2F&psig=AOvVaw2NyVuSVFJNSx2zkukNzkku&ust=1732567487474000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLigrf_q9YkDFQAAAAAdAAAAABAR"
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);