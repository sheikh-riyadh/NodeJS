import fs from "node:fs";

// Synchronouse file system
const text = "Learning node js file system";

fs.writeFileSync("./hello.txt", text, "utf-8");

const data = fs.readFileSync("./hello.txt", { encoding: "utf-8" });
console.log(data);

// Asynchonouse

const text2 = "Learning Asynchronouse";

fs.writeFile("./hello-world.txt", text2, { encoding: "utf-8" }, (error) => {
  if (error) {
    return Error("Something went wrong write file");
  }
});

fs.readFile("./hello-world.txt", { encoding: "utf-8" }, (error, data) => {
  if (error) return Error("Something went wrong read file");
  console.log(data);
});

console.log("Hi there");
