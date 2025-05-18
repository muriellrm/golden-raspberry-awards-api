import { PrismaAwardsRepository } from "#/repositories/prisma/prisma-awards-repository";
import { GetAllAwardsUseCase } from "../get-all-awards";

export const makeGetAllAwardsUseCase = () => {
  const awardsRepository = new PrismaAwardsRepository();
  const getAllAwardsUseCase = new GetAllAwardsUseCase(awardsRepository);

  return getAllAwardsUseCase;
};
