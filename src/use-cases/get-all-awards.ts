import type { Award } from "#/models/award";
import type { AwardsRepository } from "#/repositories/awards-repository";

interface Request {
  title?: string;
  year?: number;
}

export class GetAllAwardsUseCase {
  constructor(private awardsRepository: AwardsRepository) {}

  async execute({ title, year }: Request): Promise<Award[]> {
    return await this.awardsRepository.findAll({ title, year });
  }
}
