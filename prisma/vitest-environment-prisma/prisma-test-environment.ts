import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { existsSync, unlinkSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import type { Environment } from "vitest/environments";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {    
    const testDbName = `test-${randomUUID()}.db`;
    const dbPath = path.resolve(process.cwd(), "prisma", testDbName);
    process.env.DATABASE_URL = `file:${dbPath}`;
        
    execSync("npx prisma db push", { stdio: "ignore" });

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
