"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../../config/db");
const mongodb_1 = require("mongodb");
exports.todoRoutes = express_1.default.Router();
exports.todoRoutes.get("/", async (req, res) => {
    const collection = db_1.client.db("todosDB").collection("todo");
    const allTodos = await collection.find({}).toArray();
    res.send(allTodos);
});
exports.todoRoutes.post("/create-todo", async (req, res) => {
    const data = req.body;
    const collection = db_1.client.db("todosDB").collection("todo");
    const response = await collection.insertOne({ ...data });
    res.send(response);
});
exports.todoRoutes.patch("/update-todos/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const collection = db_1.client.db("todosDB").collection("todo");
    const query = { _id: new mongodb_1.ObjectId(id) };
    const update = {
        $set: {
            ...data,
        },
    };
    const options = {};
    const response = await collection.updateOne(query, update, options);
    res.send(response);
});
exports.todoRoutes.delete("/delete-todo/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new mongodb_1.ObjectId(id) };
    const collection = db_1.client.db("todosDB").collection("todo");
    const response = await collection.deleteOne(query);
    res.send(response);
});
exports.todoRoutes.get("/:id", async (req, res) => {
    const id = req.params.id;
    const collection = db_1.client.db("todosDB").collection("todo");
    const query = { _id: new mongodb_1.ObjectId(id) };
    const response = await collection.findOne(query);
    res.send(response);
});
//# sourceMappingURL=todos.routes.js.map