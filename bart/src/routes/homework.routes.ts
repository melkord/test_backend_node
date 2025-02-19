import { Router } from "express";

const router = Router();

import {
  getHomeworksController,
  getHomeworkController,
  deleteHomeworkController,
  createHomeworkController,
  editHomeworkController,
} from "../controllers/homework.controllers";

router.get("", getHomeworksController);

router.get("/:homeworkId", getHomeworkController);

router.delete("/:homeworkId", deleteHomeworkController);

router.post("", createHomeworkController);

router.put("/:homeworkId", editHomeworkController);

export default router;