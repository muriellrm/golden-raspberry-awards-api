import { InMemoryAwardsRepository } from "#/repositories/in-memory/in-memory-awards-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetAllAwardsUseCase } from "./get-all-awards";
import { randomUUID } from "crypto";

let inMemoryAwardsRepository: InMemoryAwardsRepository;
let sut: GetAllAwardsUseCase;
describe("Get All Awards Use Case", () => {
  beforeEach(async () => {
    inMemoryAwardsRepository = new InMemoryAwardsRepository();
    sut = new GetAllAwardsUseCase(inMemoryAwardsRepository);
  });

  it("should get all awards", async () => {
    for (let i = 1; i <= 2; i++) {
      const itemNumber = String(i).padStart(2, "0");
      inMemoryAwardsRepository.items.push({
        id: randomUUID(),
        producers: `Producer ${itemNumber}`,
        studios: `Studio ${itemNumber}`,
        title: `Movie ${itemNumber}`,
        winner: false,
        year: 1999,
      });
    }
    const awards = await sut.execute({});

    expect(awards).toHaveLength(2);
    expect(awards).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
      expect.objectContaining({
        id: expect.any(String),
      }),
    ]);
  });

  it("should get all awards filtering by title", async () => {
    for (let i = 1; i <= 3; i++) {
      const year = i > 1 ? 1999 : 1999 + i;
      const itemNumber = String(i).padStart(2, "0");
      inMemoryAwardsRepository.items.push({
        id: randomUUID(),
        producers: `Producer ${itemNumber}`,
        studios: `Studio ${itemNumber}`,
        title: `Movie ${itemNumber}`,
        winner: false,
        year,
      });
    }
    const awards = await sut.execute({ title: "Movie 01" });    

    expect(awards).toHaveLength(1);
    expect(awards).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),      
    ]);
  });

  it("should get all awards filtering by year", async () => {
    for (let i = 1; i <= 3; i++) {
      const year = i > 1 ? 1999 : 1999 + i;
      const itemNumber = String(i).padStart(2, "0");
      inMemoryAwardsRepository.items.push({
        id: randomUUID(),
        producers: `Producer ${itemNumber}`,
        studios: `Studio ${itemNumber}`,
        title: `Movie ${itemNumber}`,
        winner: false,
        year,
      });
    }
    const awards = await sut.execute({ year: 1999 });
    
    expect(awards).toHaveLength(2);
    expect(awards).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
      expect.objectContaining({
        id: expect.any(String),
      }),
    ]);
  });
});
