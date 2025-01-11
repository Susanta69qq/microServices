import express from "express";
const app = express();
import captainRoutes from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";
import connect from "./db/db.js";
connect();
import { connectRabbit } from "./service/rabbit.js";

connectRabbit();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", captainRoutes);

export default app;
