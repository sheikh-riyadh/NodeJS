import app from "./app.js";

const port = 5000;

const bootstrap = async () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

bootstrap()
