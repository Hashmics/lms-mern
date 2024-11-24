import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config({});

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}))

//API
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})