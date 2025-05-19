import { randomUUID } from "node:crypto";
import type { Award } from "#/models/award";
import type {
  AwardInputRequest,
  AwardsRepository,
  QueryAll,
} from "../awards-repository";

export class InMemoryAwardsRepository implements AwardsRepository {
  public items: Award[] = [];

  async create({ producers, studios, title, winner, year }: AwardInputRequest) {
    const award: Award = {
      producers,
      studios,
      title,
      winner,
      year,
      id: randomUUID(),
    };

    this.items.push(award);
    return award;
  }
  async findAll({ title, year, winner }: QueryAll) {
    return this.items.filter((item) => {
      const matchesTitle = title ? item.title === title : true;
      const matchesYear = year ? item.year === year : true;
      const matchesWinner = winner ? item.winner === winner : true;
      return matchesTitle && matchesYear && matchesWinner;
    });
  }

  async import(data: AwardInputRequest[]) {
    const awards: Award[] = data.map((item) => ({ ...item, id: randomUUID() }));
    awards.forEach((item) => this.items.push(item));
  }
}
