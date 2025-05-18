import { PrismaAwardsRepository } from "#/repositories/prisma/prisma-awards-repository";
import { GetAwardIntervalsUseCase } from "../get-award-intervals";

export const makeGetAwardIntervalsUseCase = () => {
  const awardsRepository = new PrismaAwardsRepository();
  const getAwardIntervalsUseCase = new GetAwardIntervalsUseCase(awardsRepository);

  return getAwardIntervalsUseCase;
};
