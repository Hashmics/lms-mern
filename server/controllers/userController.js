import { User } from "../models/userModel.js";
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create(
            {
                name,
                email,
                password: hashedPassword
            }
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        });
        console.log(error)
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }
        generateToken(res, user, `Welcome Back ${user.name}`);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to load user profile"
        })
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // extract public id of the old image from the url exist
        if (user.photoURL) {
            const publicId = user.photoURL.split("/").pop().split(".")[0];
            deleteMedia(publicId);
        }

        // Upload new image
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoURL = cloudResponse.secure_url;

        const updatedData = { name, photoURL }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "User profile updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update user profile"
        })
    }
}