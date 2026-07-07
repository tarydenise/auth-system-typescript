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

    await new Promise((resolve) => setTimeout(resolve, 100));

    const newUser = userStore.createUser(username, password, email);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = userStore.findByUsername(username);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    res.json({ message: "Login successful", userId: user.id });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PROFILE
router.get("/profile/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = userStore.findById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  
  res.json({ user });
});

export default router;