import type { Award } from "#/models/award";
import type { AwardsRepository } from "#/repositories/awards-repository";

type Request = Omit<Award, "id">;

export class CreateAwardUseCase {
  constructor(private awardsRepository: AwardsRepository) {}

  async execute({
    producers,
    studios,
    title,
    winner,
    year,
  }: Request): Promise<Award> {
    return await this.awardsRepository.create({
      producers,
      studios,
      title,
      winner,
      year,
    });
  }
}
