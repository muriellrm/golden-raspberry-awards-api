import { makeGetAwardIntervalsUseCase } from "#/use-cases/factories/make-get-award-intervals-use-case";
import { Request, Response } from "express";

export const intervals = async (_: Request, response: Response) => {
  const getAwardIntervalsUseCase = makeGetAwardIntervalsUseCase();

  const award = await getAwardIntervalsUseCase.execute();
  response.status(200).json(award);
};
