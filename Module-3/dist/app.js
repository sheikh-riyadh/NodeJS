"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_routes_1 = require("./app/todos/todos.routes");
const app = (0, express_1.default)();
// Midleware
app.use(express_1.default.json());
app.use("/", todos_routes_1.todoRoutes);
// Not found handling
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: "Route not found",
    });
});
// Global error handling
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: error.message || "Something went wrong",
        error,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map