import { Request, Response } from "express";
import { createReadStream } from "fs";
import csv from "csv-parser";

import type { AwardInputRequest } from "#/repositories/awards-repository";
import { makeImportAwardsUseCase } from "#/use-cases/factories/make-import-awards-use-case";

import { clearTmpCsvFolder } from "#/utils/clear-tmp-csv-folter";

export const importAwards = async (request: Request, response: Response) => {  
  if (!request.file) {
    response.status(400).json({ error: "Arquivo CSV é obrigatório" });
    return;
  }

  try {
    const csvPath = request.file.path;
    const awards: AwardInputRequest[] = [];
    const importAwardsUseCase = makeImportAwardsUseCase();

    await new Promise<void>((resolve, reject) => {
      createReadStream(csvPath)
        .pipe(csv({ separator: ";" }))
        .on("data", (row: any) => {
          awards.push({
            year: parseInt(row.year, 10),
            title: row.title,
            studios: row.studios,
            producers: row.producers,
            winner: row.winner?.trim().toLowerCase() === "yes",
          });
        })
        .on("end", async () => {
          await importAwardsUseCase.execute({ awards });
          resolve();
        })
        .on("error", (error) => {
          reject(error);
        });
    });

    response.status(201).json({
      message: "Importação concluída com sucesso",
    });
    await clearTmpCsvFolder();
  } catch (error) {
    console.error("Erro ao importar awards:", error);
    response.status(500).json({ error: "Erro interno ao importar CSV" });
  }
};
