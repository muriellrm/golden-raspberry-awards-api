import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

import { env } from "#/env";
import type { AwardInputRequest } from "#/repositories/awards-repository";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});

async function clearAwardsTable() {
  await prisma.award.deleteMany({});
}

async function loadCSV(): Promise<void> {
  const csvPath = path.resolve(process.cwd(), ".internals", "Movielist.csv");
  console.log(csvPath);

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

if (env.NODE_ENV !== "test") {
  clearAwardsTable();
  loadCSV();
}
