import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";
import { existsSync, unlinkSync } from "fs";
import { execSync } from "child_process";

import { env } from "#/env";
import type { AwardInputRequest } from "#/repositories/awards-repository";
import { clearTmpDatabase } from "#/utils/clear-tmp-database";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});

export const uploadDest = ".internals/tmp";

async function loadCSV(): Promise<void> {
  const csvPath = path.resolve(
    process.cwd(),
    ".internals",
    "fixtures",
    "movie-list.csv"
  );

  return new Promise((resolve) => {
    const awards: AwardInputRequest[] = [];

    fs.createReadStream(csvPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (row: any) => {
        awards.push({
          year: parseInt(row.year),
          title: row.title,
          studios: row.studios,
          producers: row.producers,
          winner: row.winner?.trim().toLowerCase() === "yes",
        });
      })
      .on("end", async () => {
        await prisma.award.createMany({ data: awards });
        resolve();
      });
  });
}

process.on("SIGINT", () => {
  clearTmpDatabase();
  process.exit();
});

execSync("npx prisma db push", { stdio: "ignore" });

if (env.NODE_ENV !== "test") {
  loadCSV();
}
