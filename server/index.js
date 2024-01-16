import dotenv from "dotenv";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import habitroute from './routes/habitRoute.js'
import userRoutes from "./routes/userRoutes.js";
import verify from "./middleware/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/habit', verify, habitroute);
app.use("/users", userRoutes);

mongoose.set('strictQuery', true);
const connectDB = (url) => {
    mongoose.connect(url).then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err)=>console.log(err))
};

app.get('/', (req, res) => {
    res.status(200).send("Welcome to backend of Habit Tracker");
});

app.listen(5000, () => {
    try {
        connectDB(process.env.MONGO_URL);
        console.log("listining to http://localhost:5000");
    } catch (error) {
        console.log(error);
    }
});