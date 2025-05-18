import { makeGetAllAwardsUseCase } from "#/use-cases/factories/make-get-all-awards-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export const search = async (request: Request, response: Response) => {
  const querySchema = z.object({
    title: z.string().optional(),
    year: z.coerce.number().optional(),
    winner: z
      .union([
        z.literal("true").transform(() => true),
        z.literal("false").transform(() => false),
        z.undefined(),
      ])
      .optional(),
  });

  const { title, winner, year } = querySchema.parse(request.query);

  const getAllAwardsUseCase = makeGetAllAwardsUseCase();

  const awards = await getAllAwardsUseCase.execute({ title, winner, year });
  response.status(200).json(awards);
};
