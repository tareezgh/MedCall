const functions = require("firebase-functions");
const express = require("express");
const dotenv = require("dotenv");
import routes from "./routes";
import { connectDb } from "./db/index";
import { Request, Response } from "express";
import { applyMiddleware } from "./middleware/middleware";

dotenv.config({ path: `.env.production` });

const app = express();
applyMiddleware(app);
app.use(routes);

app.get("/some-data", (request: Request, response: Response) => {
  response.send("Hello world");
});

connectDb().then(async () => {
  console.log(`Connected to the database`);
});

exports.app = functions.https.onRequest((req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "https://medcall-client.web.app");
  res.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  app(req, res);
});
