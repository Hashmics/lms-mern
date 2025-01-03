import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/userRoute.js'
import courseRoute from './routes/courseRoute.js'
import mediaRoute from './routes/mediaRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import purchaseRoute from "./routes/purchaseCourseRoute.js";
import courseProgressRoute from "./routes/courseProgressRoute.js";

dotenv.config({});

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

//default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

//API
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})