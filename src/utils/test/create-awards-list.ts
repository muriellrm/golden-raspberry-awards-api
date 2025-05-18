import type { Award } from "#/models/award";
import type { AwardInputRequest } from "#/repositories/awards-repository";
import request from "supertest";
import type { App } from "supertest/types";

const mockedAwards: AwardInputRequest[] = [
  {
    producers: `Producer 01`,
    studios: `Studio 01`,
    title: `Movie 01`,
    winner: true,
    year: 1999,
  },
  {
    producers: `Producer 01`,
    studios: `Studio 05`,
    title: `Movie 04`,
    winner: true,
    year: 2002,
  },
  {
    producers: `Producer 01`,
    studios: `Studio 05`,
    title: `Movie 08`,
    winner: true,
    year: 2025,
  },
  {
    producers: `Producer 05`,
    studios: `Studio 05`,
    title: `Movie 15`,
    winner: true,
    year: 2012,
  },
  {
    producers: `Producer 05`,
    studios: `Studio 02`,
    title: `Movie 88`,
    winner: true,
    year: 2023,
  },
  {
    producers: `Producer 04`,
    studios: `Studio 25`,
    title: `Movie 11`,
    winner: false,
    year: 2024,
  },
];

export const createAwardsList = async (app: App) => {
  const awardsPromises = mockedAwards.map((newAward) =>
    request(app).post("/awards").send(newAward)
  );

  const awards = await Promise.all(awardsPromises);
  return awards.map(response => response.body) as Award[];
};
