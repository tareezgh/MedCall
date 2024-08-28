import express from "express";
import routes from "./routes";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import { connectDb } from "./db/index";
import bodyParser from "body-parser";
import cors from "cors";
import Message from "./db/models/conversation";
import setupWebSocket from "./websocketHandler";

require("dotenv").config();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, // This is important for setting the Access-Control-Allow-Credentials header
};

const app = express();
const server = http.createServer(app);
setupWebSocket(server);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(routes);

const PORT = process.env.PORT || 3001;

// Error handling for server
server.on("error", (error) => {
  console.error("Server error:", error);
});

connectDb().then(async () => {
  server.listen(PORT, () =>
    console.log(`Listening on http://localhost:${PORT}`)
  );
});
