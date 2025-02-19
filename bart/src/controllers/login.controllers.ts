import { Request, Response, NextFunction } from "express";

import { login } from "../services/lisa-api";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const token = await login(email, password);
    res.json(token);
  } catch (e) {
    next(e);
  }
};

export { loginController };
