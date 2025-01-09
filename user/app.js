import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import connect from "./db/db.js";
connect();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRoutes);

export default app;
