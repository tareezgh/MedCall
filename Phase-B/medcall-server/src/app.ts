import express from "express";
import routes from "./routes";
import { connectDb } from "./db/index";
import bodyParser from "body-parser";
import cors from "cors";

require('dotenv').config();
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

const PORT = process.env.PORT;


connectDb().then(async () => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});
