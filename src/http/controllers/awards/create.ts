import { makeCreateAwardUseCase } from "#/use-cases/factories/make-create-award-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export const create = async (request: Request, response: Response) => {
  const bodySchema = z.object({
    year: z.number().int().min(1000).max(9999),
    title: z.string(),
    studios: z.string(),
    producers: z.string(),
    winner: z.boolean(),
  });

  const { title, winner, year, producers, studios } = bodySchema.parse(
    request.body
  );

  const createAwardUseCase = makeCreateAwardUseCase();

  const award = await createAwardUseCase.execute({
    title,
    winner,
    year,
    producers,
    studios,
  });
  response.status(201).json(award);
};
