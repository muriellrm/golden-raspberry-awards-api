import { prisma } from "#/lib/prisma";
import type { Award } from "#/models/award";
import type {
  AwardInputRequest,
  AwardsRepository,
  QueryAll,
} from "../awards-repository";

export class PrismaAwardsRepository implements AwardsRepository {
  async findAll({ title, winner, year }: QueryAll) {
    return await prisma.award.findMany({
      where: {
        title,
        winner,
        year,
      },
    });
  }
  async create(data: AwardInputRequest) {
    return await prisma.award.create({ data });
  }

  async import(data: AwardInputRequest[]) {
    await prisma.award.createMany({ data });        
  }
}
