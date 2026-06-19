import express, { Application } from "express";
import { todoRoutes } from "./app/todos/todos.routes";
const app: Application = express();

// Midleware
app.use(express.json());
app.use("/", todoRoutes)
export default app;
