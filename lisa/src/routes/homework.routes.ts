import { Router } from "express";
const router = Router();

import {
  getHomeworksController,
  getHomeworkController,
  deleteHomeworkController,
  createHomeworkController,
  editHomeworkController,
} from "../controllers/homeworks.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";

router.get("", getHomeworksController);

router.get("/:homeworkId", getHomeworkController);

router.delete("/:homeworkId", verifyToken, deleteHomeworkController);

router.post("/", verifyToken, createHomeworkController);

router.put("/:homeworkId", verifyToken, editHomeworkController);

export default router;
