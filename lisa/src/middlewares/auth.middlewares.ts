import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized access" });
    return;
  }
  const [, token] = authHeader.split(" ");

  const user = await prisma.user.findUnique({
    where: { token: token },
  });
  if (
    user === null ||
    user.tokenExpiration === null ||
    user.tokenExpiration < new Date()
  ) {
    res.status(401).json({ error: "Unauthorized access " });
    return;
  }

  next();
};
export { verifyToken };
