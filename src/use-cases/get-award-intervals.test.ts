import { beforeEach, describe, it, expect } from "vitest";
import { GetAwardIntervalsUseCase } from "./get-award-intervals";

import { InMemoryAwardsRepository } from "#/repositories/in-memory/in-memory-awards-repository";
import type { Award } from "#/models/award";

let inMemoryAwardsRepository: InMemoryAwardsRepository;
let sut: GetAwardIntervalsUseCase;

const mockAwards: Award[] = [
  { id: '1', year: 2000, title: 'Best Film', studios: 'Studio A', producers: 'Producer 1', winner: true },
  { id: '2', year: 2002, title: 'Best Film', studios: 'Studio A', producers: 'Producer 1', winner: true },
  { id: '3', year: 2010, title: 'Best Film', studios: 'Studio B', producers: 'Producer 2', winner: true },
  { id: '4', year: 2015, title: 'Best Film', studios: 'Studio B', producers: 'Producer 2', winner: true },
  { id: '12', year: 2050, title: 'Best Film', studios: 'Studio A', producers: 'Producer 1', winner: true }
];

describe("Get Award Intervals Use Case", () => {
  beforeEach(async () => {
    inMemoryAwardsRepository = new InMemoryAwardsRepository();
    sut = new GetAwardIntervalsUseCase(inMemoryAwardsRepository);
    inMemoryAwardsRepository.items = mockAwards;
  });

  it("should get award intervals", async () => {
    const result = await sut.execute();
    expect(result).toEqual(expect.objectContaining({
      min: [
        expect.objectContaining({
          producer: 'Producer 1',
          interval: 2
        })
      ],
      max: [
        expect.objectContaining({
          producer: 'Producer 1',
          interval: 48
        }),
        expect.objectContaining({
          producer: 'Producer 2',
          interval: 5
        })
      ]
    }));
  });
});
