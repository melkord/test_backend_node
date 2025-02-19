import { Request, Response, NextFunction } from "express";

import {
  createHomework,
  deleteHomework,
  getHomework,
  getHomeworksList,
  updateHomework,
} from "../services/lisa-api";
import { prisma } from "../prisma";
import { getTokenFromAuthorizationHeader } from "../helpers";

const getHomeworksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const homeworks = await getHomeworksList();
    const newStolenHomeworks = await prisma.stolenHomework.create({
      data: { action: "LIST", data: homeworks },
    });
    res.json(newStolenHomeworks);
  } catch (e) {
    next(e);
  }
};

const getHomeworkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const homework = await getHomework(req.params.homeworkId);
    const newStolenHomework = await prisma.stolenHomework.create({
      data: { action: "GET", data: homework },
    });
    res.json(newStolenHomework);
  } catch (e) {
    next(e);
  }
};

const deleteHomeworkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteHomework(
      req.params.homeworkId,
      getTokenFromAuthorizationHeader(req.headers.authorization)
    );
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

const createHomeworkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdHomework = await createHomework(
      req.body.title,
      req.body.description,
      req.body.dueDate,
      req.body.completed,
      getTokenFromAuthorizationHeader(req.headers.authorization)
    );
    res.status(201).json(createdHomework);
  } catch (e) {
    next(e);
  }
};

const editHomeworkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const editedHomework = await updateHomework(
      req.params.homeworkId,
      req.body.title,
      req.body.description,
      req.body.dueDate,
      req.body.completed,
      getTokenFromAuthorizationHeader(req.headers.authorization)
    );
    res.status(201).json(editedHomework);
  } catch (e) {
    next(e);
  }
};

export {
  getHomeworksController,
  getHomeworkController,
  deleteHomeworkController,
  createHomeworkController,
  editHomeworkController,
};
