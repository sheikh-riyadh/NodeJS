"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.todoRoutes = express_1.default.Router();
exports.todoRoutes.get("/", (req, res) => {
    const filePath = path_1.default.join(__dirname, "../../../db/todos.json");
    const allTodos = JSON.parse(fs_1.default.readFileSync(filePath, { encoding: "utf-8" }));
    res.send(allTodos);
});
//# sourceMappingURL=todos.routes.js.map