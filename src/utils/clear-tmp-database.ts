import { env } from "#/env";
import { existsSync, unlinkSync } from "fs";
import path from "path";

export const clearTmpDatabase = () => {
  const [dbName] = env.DATABASE_URL.slice("file:".length).split("?");
  const dbPath = path.resolve(process.cwd(), "prisma", dbName);
  if (existsSync(dbPath)) {
    unlinkSync(dbPath);
  }
};