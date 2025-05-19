import { uploadDest } from "#/lib/prisma";
import { promises } from "fs";
import path from "path";

export const clearTmpCsvFolder = async () => {
  const tmpFolder = path.resolve(uploadDest);

  try {
    const files = await promises.readdir(tmpFolder);

    const unlinkPromises = files.map((file) =>
      promises.unlink(path.join(tmpFolder, file))
    );

    await Promise.all(unlinkPromises);
  } catch (error) {
    console.error("Erro ao limpar a pasta tmp:", error);
  }
};
