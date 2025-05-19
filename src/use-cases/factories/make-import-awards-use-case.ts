import { PrismaAwardsRepository } from "#/repositories/prisma/prisma-awards-repository";
import { ImportAwardsUseCase } from "../import-awards";

export const makeImportAwardsUseCase = () => {
  const awardsRepository = new PrismaAwardsRepository();
  const importAwardsUseCase = new ImportAwardsUseCase(awardsRepository);

  return importAwardsUseCase;
};

