import { Request, Response } from "express";
import { prisma } from "../prisma";

const getHomeworksController = async (req: Request, res: Response) => {
  const homework = await prisma.homework.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  res.json(homework);
};

const getHomeworkController = async (req: Request, res: Response) => {
  try {
    const homework = await prisma.homework.findUniqueOrThrow({
      where: { id: req.params.homeworkId },
    });
    res.json(homework);
  } catch (e) {
    res.status(404).json({ error: "Homework not found" });
  }
};

const deleteHomeworkController = async (req: Request, res: Response) => {
  try {
    await prisma.homework.delete({
      where: { id: req.params.homeworkId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).send();
  }
};

const createHomeworkController = async (req: Request, res: Response) => {
  const homeworkCreated = await prisma.homework.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      dueDate: new Date(req.body.dueDate),
      completed: req.body?.completed || false,
    },
  });
  res.status(201).json(homeworkCreated);
};

const editHomeworkController = async (req: Request, res: Response) => {
  const { title, description, dueDate, completed } = req.body;
  if (!title || !description || !dueDate) {
    res.status(400).json({
      error: 'The "title","description" and "dueDate" fields are mandatory',
    });
    return;
  }

  const homeworkUpdated = await prisma.homework.update({
    data: {
      title: title,
      description: description,
      dueDate: dueDate,
      completed: completed || false,
    },
    where: { id: req.params.homeworkId },
  });
  res.status(200).json(homeworkUpdated);
};

export {
  getHomeworksController,
  getHomeworkController,
  deleteHomeworkController,
  createHomeworkController,
  editHomeworkController,
};
