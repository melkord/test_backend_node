import { createHash, randomUUID } from "crypto";

const getPasswordHash = (password: string): string =>
  createHash("sha256").update(password).digest("hex");

const getToken = (): string => randomUUID();

export { getPasswordHash, getToken };
