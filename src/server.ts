import express from "express";
import authRouter from "./routes/authRoutes";

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

console.log("Server is starting...");

// Use auth routes
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});