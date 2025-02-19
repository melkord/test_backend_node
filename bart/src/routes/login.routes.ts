import { Router } from "express";
import { loginController } from "../controllers/login.controllers";
const router = Router();

router.post("/", loginController);

export default router;
