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
exports.todoRoutes.get("/", async (req, res, next) => {
    try {
        console.log(amar);
        const collection = db_1.client.db("todosDB").collection("todo");
        const allTodos = await collection.find({}).toArray();
        res.send(allTodos);
    }
    catch (error) {
        next(error);
    }
});
exports.todoRoutes.post("/create-todo", async (req, res, next) => {
    try {
        const data = req.body;
        const collection = db_1.client.db("todosDB").collection("todo");
        const response = await collection.insertOne({ ...data });
        res.send(response);
    }
    catch (error) {
        next(error);
    }
});
exports.todoRoutes.patch("/update-todos/:id", async (req, res, next) => {
    try {
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
    }
    catch (error) {
        next(error);
    }
});
exports.todoRoutes.delete("/delete-todo/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const collection = db_1.client.db("todosDB").collection("todo");
        const response = await collection.deleteOne(query);
        res.send(response);
    }
    catch (error) {
        next(error);
    }
});
exports.todoRoutes.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const collection = db_1.client.db("todosDB").collection("todo");
        const query = { _id: new mongodb_1.ObjectId(id) };
        const response = await collection.findOne(query);
        res.send(response);
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=todos.routes.js.map