import type {
  AwardInputRequest,
  AwardsRepository,
} from "#/repositories/awards-repository";

interface Request {
  awards: AwardInputRequest[];
}

export class ImportAwardsUseCase {
  constructor(private awardsRepository: AwardsRepository) {}

  async execute({ awards }: Request): Promise<void> {
    await this.awardsRepository.import(awards);
  }
}
