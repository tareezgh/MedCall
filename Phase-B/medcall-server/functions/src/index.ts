const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
import routes from "./routes";
import { connectDb } from "./db/index";

import { NextFunction, Request, Response } from "express";

const env = functions.config().NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });
const corsOptions = {
  origin: "*",
  credentials: true, // This is important for setting the Access-Control-Allow-Credentials header
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.options('*', cors(corsOptions));
app.use(routes);

const PORT = process.env.PORT;

app.get("/some-data", (request:Request, response:Response) => {
  response.send("Hello world");
  });

connectDb().then(async () => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});

exports.app = functions.https.onRequest(app);