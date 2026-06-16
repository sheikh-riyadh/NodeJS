const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "content-type": "aplication/json",
    });

    const filePath = path.join(__dirname, "./db/todos.json");
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });

    res.end(data);
  } else if (req.method === "GET" && req.url === "/get-todos") {
    res.writeHead(200, {
      "content-type": "aplication/json",
    });

    const filePath = path.join(__dirname, "./db/todos.json");
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });

    res.end(data);
  } else if (req.method === "POST" && req.url === "/create-todos") {
    const createtAt = new Date().toISOString();
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const todos = JSON.parse(data);
      console.log({...todos, createtAt})
    });
    res.end("Created todos sucessfully");
  } else if (req.method === "PATCH" && req.url === "/update-todos") {
    res.end("Update todos successfully");
  } else if (req.method === "DELETE" && req.url === "/delete-todos") {
    res.end("delete todos successfully");
  } else {
    res.end("No route found");
    console.log(req.url);
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server listen on 5000 port");
});
