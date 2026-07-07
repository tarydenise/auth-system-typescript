import { Router } from "express";
import { UserStore } from "../models/User";

const router = Router();
const userStore = new UserStore();

router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Authentication service is running" });
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const existingUser = userStore.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate delay

    const newUser = userStore.createUser(username, password, email);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;