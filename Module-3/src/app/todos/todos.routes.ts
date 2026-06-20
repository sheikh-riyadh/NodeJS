import express, { Request, Response } from "express";
import { client } from "../../config/db";
import { ObjectId } from "mongodb";

export const todoRoutes = express.Router();

todoRoutes.get("/", async (req: Request, res: Response) => {
  const collection = client.db("todosDB").collection("todo");
  const allTodos = await collection.find({}).toArray();
  res.send(allTodos);
});

todoRoutes.post("/create-todo", async (req: Request, res: Response) => {
  const data = req.body;
  const collection = client.db("todosDB").collection("todo");
  const response = await collection.insertOne({ ...data });
  res.send(response);
});

todoRoutes.patch("/update-todos/:id", async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const data = req.body;
  const collection = client.db("todosDB").collection("todo");
  const query = { _id: new ObjectId(id) };
  const update = {
    $set: {
      ...data,
    },
  };
  const options = {};

  const response = await collection.updateOne(query, update, options);
  res.send(response);
});

todoRoutes.delete("/delete-todo/:id", async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const query = { _id: new ObjectId(id) };
  const collection = client.db("todosDB").collection("todo");
  const response = await collection.deleteOne(query);
  res.send(response);
});

todoRoutes.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const collection = client.db("todosDB").collection("todo");
  const query = { _id: new ObjectId(id) };
  const response = await collection.findOne(query);
  res.send(response);
});
