import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";

import { connectDB } from "./config/db.js";
import contestRoutes from "./routes/contest.routes.js";
import participantRoutes from "./routes/participant.routes.js";
import levelRoutes from "./routes/levelAttempt.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import { initSocket } from "./socket.js";
import adminRoutes from "./routes/admin.routes.js";


const app = express();
const server = http.createServer(app);   
initSocket(server);                      

app.use(cors());
app.use(express.json());

app.use("/api/contest", contestRoutes);
app.use("/api/participant", participantRoutes);
app.use("/api/level", levelRoutes);
app.use("/api/submission", submissionRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Contest Backend is running 🚀");
});

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
