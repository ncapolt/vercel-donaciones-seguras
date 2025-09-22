import { Router } from "express";
import { getCurrentUser, login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.get("/user", getCurrentUser);

export default router;

