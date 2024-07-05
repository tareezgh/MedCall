const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
import routes from "./routes";
import { connectDb } from "./db/index";

import { Request, Response } from "express";

dotenv.config({ path: `.env.production` });

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use(routes);

const PORT = process.env.PORT;

app.get("/some-data", (request: Request, response: Response) => {
  response.send("Hello world");
});

connectDb().then(async () => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});

exports.app = functions.https.onRequest(app);
