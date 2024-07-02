/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
import routes from "./routes";
import { connectDb } from "./db/index";

import { Request, Response } from "express";

// require("dotenv").config();

const env = functions.config().NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });
const corsOptions = {
  origin: functions.config().frontend.url,
  credentials: true, // This is important for setting the Access-Control-Allow-Credentials header
};

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(routes);

const PORT = process.env.PORT;

app.get("/some-data", (request:Request, response:Response) => {
  response.send("Hello world");
  });

connectDb().then(async () => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});

exports.app = functions.https.onRequest(app);