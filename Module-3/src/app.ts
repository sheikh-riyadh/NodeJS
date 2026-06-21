import express, { Application, NextFunction, Request, Response } from "express";
import { todoRoutes } from "./app/todos/todos.routes";
const app: Application = express();

// Midleware
app.use(express.json());
app.use("/", todoRoutes);








// Not found handling
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 404,
    message: "Route not found",
  });
});

// Global error handling
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
    error,
  });
});

export default app;
