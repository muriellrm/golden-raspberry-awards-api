import { InMemoryAwardsRepository } from "#/repositories/in-memory/in-memory-awards-repository";
import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAwardUseCase } from "./create-award";

let inMemoryAwardsRepository: InMemoryAwardsRepository;
let sut: CreateAwardUseCase;
describe("Create Award Use Case", () => {
  beforeEach(async () => {
    inMemoryAwardsRepository = new InMemoryAwardsRepository();
    sut = new CreateAwardUseCase(inMemoryAwardsRepository);
  });

  it("should get all awards", async () => {    
    const award = await sut.execute({
      producers: `Producer 01`,
        studios: `Studio 01`,
        title: `Movie 01`,
        winner: true,
        year: 1999,
    });

    expect(award.id).toEqual(expect.any(String));
    expect(award.title).toEqual("Movie 01");
  });
});
