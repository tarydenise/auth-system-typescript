import { Router } from "express";
import { UserStore } from "../models/User";
import { AppError } from "../errors/AppError";

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
      throw new AppError("Username and password are required", 400);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    const newUser = userStore.createUser(username, password, email);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error: any) {
    console.error("Error in /register:", error.message);

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = userStore.findByUsername(username);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.password !== password) {
      throw new AppError("Invalid username or password", 401);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    res.json({ message: "Login successful", userId: user.id });
  } catch (error: any) {
    console.error("Error in /login:", error.message);

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

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