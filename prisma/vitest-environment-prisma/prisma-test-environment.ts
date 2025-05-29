import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import "dotenv/config";
import { existsSync, unlinkSync } from "fs";
import path from "path";
import type { Environment } from "vitest/environments";

const prisma = new PrismaClient();

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const testDbName = `test-${randomUUID()}.db`;
    const dbPath = path.resolve(process.cwd(), "prisma", testDbName);
    process.env.DATABASE_URL = `file:${dbPath}`;

    return {
      async teardown() {
        await prisma.$disconnect();
        if (existsSync(dbPath)) {
          unlinkSync(dbPath);
        }
      },
    };
  },
};
