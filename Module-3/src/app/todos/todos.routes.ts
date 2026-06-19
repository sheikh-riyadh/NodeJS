import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";

export const todoRoutes = express.Router();

todoRoutes.get("/", (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../../../db/todos.json");
  const allTodos = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  res.send(allTodos);
});
