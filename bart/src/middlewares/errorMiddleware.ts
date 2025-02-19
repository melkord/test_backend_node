import { Request, Response, NextFunction } from "express";
import axios from "axios";

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (axios.isAxiosError(err)) {
    res
      .status(err.response?.status ?? 500)
      .json({ error: err.response?.data?.error ?? "Generic error" });
    return;
  }

  res.status(500).json({ error: "Generic error" });
  return;
};

export { errorMiddleware };
