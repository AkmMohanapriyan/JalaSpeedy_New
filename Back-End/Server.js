import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB  from './Config/db.js';
import userRoutes from './Routes/userRoutes.js';
import waterRequestRoutes from './Routes/waterRequestRoutes.js';
import requestRoutes from './Routes/requestRoutes.js';
import reportRoutes from './Routes/reportRoutes.js';
import emergencyRoutes from "./Routes/emergencyRequestRoutes.js";



dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/requests', waterRequestRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api', reportRoutes);
app.use("/api/emergency-requests", emergencyRoutes);


app.get("/", (req, res) => {
  res.send("Backend server running");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
