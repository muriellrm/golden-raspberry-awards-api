import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryAwardsRepository } from "#/repositories/in-memory/in-memory-awards-repository";
import { ImportAwardsUseCase } from "./import-awards";

let inMemoryAwardsRepository: InMemoryAwardsRepository;
let sut: ImportAwardsUseCase;

describe("Import Awards Use Case", () => {
  beforeEach(() => {
    inMemoryAwardsRepository = new InMemoryAwardsRepository();
    sut = new ImportAwardsUseCase(inMemoryAwardsRepository);
  });

  it("should be able to import a list of awards", async () => {
    const awards = [
      {
        year: 2001,
        title: "Movie A",
        studios: "Studio A",
        producers: "Producer A",
        winner: true,
      },
      {
        year: 2002,
        title: "Movie B",
        studios: "Studio B",
        producers: "Producer B",
        winner: false,
      },
    ];

    await sut.execute({ awards });    

    expect(inMemoryAwardsRepository.items).toHaveLength(2);
    expect(inMemoryAwardsRepository.items).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: "Movie A",
        year: 2001,
        studios: "Studio A",
        producers: "Producer A",
        winner: true,
      }),
      expect.objectContaining({
        id: expect.any(String),
        title: "Movie B",
        year: 2002,
        studios: "Studio B",
        producers: "Producer B",
        winner: false,
      }),
    ]);
  });
});
