import { PrismaAwardsRepository } from "#/repositories/prisma/prisma-awards-repository";
import { CreateAwardUseCase } from "../create-award";

export const makeCreateAwardUseCase = () => {
  const awardsRepository = new PrismaAwardsRepository();
  const createAwardUseCase = new CreateAwardUseCase(awardsRepository);

  return createAwardUseCase;
};
