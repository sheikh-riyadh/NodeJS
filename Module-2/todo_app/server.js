const http = require("http");
const path = require("path");
const fs = require("fs");
const { urlToHttpOptions } = require("url");
const { json } = require("stream/consumers");

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "./db/todos.json");
  const { pathname, searchParams } = new URL(
    req.url,
    `http://${req.headers.host}`,
  );

  if (req.method === "GET" && pathname === "/") {
    res.writeHead(200, {
      "content-type": "aplication/json",
    });

    const filePath = path.join(__dirname, "./db/todos.json");
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });

    res.end(data);
  } else if (req.method === "GET" && pathname === "/get-todos") {
    res.writeHead(200, {
      "content-type": "aplication/json",
    });

    const data = fs.readFileSync(filePath, { encoding: "utf-8" });

    res.end(data);
  } else if (req.method === "POST" && pathname === "/create-todos") {
    const createtAt = new Date().toISOString();
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const todos = JSON.parse(data);
      const allTodos = JSON.parse(
        fs.readFileSync(filePath, { encoding: "utf-8" }),
      );
      allTodos.push({ ...todos, createtAt });
      fs.writeFileSync(filePath, JSON.stringify(allTodos, null, 2), {
        encoding: "utf-8",
      });
      res.end(JSON.stringify({ ...todos, createtAt }, null, 2));
    });
  } else if (req.method === "GET" && pathname === "/todo") {
    const title = searchParams.get("title");
    const allTodo = JSON.parse(
      fs.readFileSync(filePath, { encoding: "utf-8" }),
    );
    const targetedTodo = allTodos.find((todo) => todo.title === title);
    res.end(JSON.stringify(targetedTodo, null, 2));
  } else if (req.method === "PATCH" && pathname === "/update-todos") {
    const updatedAt = new Date().toISOString();
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const title = searchParams.get("title");
      const allTodos = JSON.parse(
        fs.readFileSync(filePath, { encoding: "utf-8" }),
      );
      const todoIndex = allTodos.findIndex((todo) => todo.title === title);

      allTodos[todoIndex].body = JSON.parse(data).body;
      fs.writeFileSync(filePath, JSON.stringify(allTodos, null, 2));
      res.end(JSON.stringify({ title, ...JSON.parse(data), updatedAt }));
    });
  } else if (req.method === "DELETE" && pathname === "/delete-todos") {
    const title = searchParams.get("title");
    const allTodos = JSON.parse(
      fs.readFileSync(filePath, { encoding: "utf-8" }),
    );
    const filterData = allTodos.filter((todo) => todo.title !== title);

    fs.writeFileSync(filePath, JSON.stringify(filterData, null, 2));

    res.end("Deleted successful");
  } else {
    res.end("No route found");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server listen on 5000 port");
});
