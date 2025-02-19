import { Router, Request, Response } from "express";

import { prisma } from "../prisma";
import { getStatus } from "../services/lisa-api";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("App BART staus ok");
});

router.get("/get-lisa-status", async (req: Request, res: Response) => {
  const lisaStatus = await getStatus();
  res.send(`Lisa says: ${lisaStatus}`);
});

router.get("/get-stolen-homeworks", async (req: Request, res: Response) => {
  const stolenHomeworks = await prisma.stolenHomework.findMany();
  res.json(stolenHomeworks);
});

export default router;
