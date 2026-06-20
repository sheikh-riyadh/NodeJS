import app from "./app.js";
import { client } from "./config/db.js";

const port = 5000;

const bootstrap = async () => {
  await client.connect();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

bootstrap();
