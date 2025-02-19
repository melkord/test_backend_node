import { Request, Response } from "express";
import { prisma } from "../prisma";
import { getToken, getPasswordHash } from "../helpers";

const TOKEN_TTL = 60 * 60 * 1000;

const loginController = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: req.body.email,
        password: getPasswordHash(req.body.password),
      },
    });

    const token = getToken();
    await prisma.user.update({
      where: { id: user.id },
      data: { tokenExpiration: new Date(Date.now() + TOKEN_TTL), token },
    });
    res.json({ token });
  } catch (error) {
    res.status(401).send();
  }
};

export { loginController };
