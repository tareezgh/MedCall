import express from "express";
import routes from "./routes";
import { connectDb } from "./db/index";
import bodyParser from "body-parser";
import cors from "cors";

require("dotenv").config();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, // This is important for setting the Access-Control-Allow-Credentials header
};

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(routes);

const PORT = process.env.PORT;

connectDb().then(async () => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});
