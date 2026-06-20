import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://todosDB:ChtD2qfHcFcHMYkf@cluster0.wjboujk.mongodb.net/todosDB=Cluster0";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
