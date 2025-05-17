import type { Award } from "#/models/award";
import type { AwardsRepository, QueryAll } from "../awards-repository";

export class InMemoryAwardsRepository implements AwardsRepository {
  public items: Award[] = [];
  async findAll({ title, year }: QueryAll) {    
    return this.items.filter((item) => {      
      const matchesTitle = title ? item.title === title : true;
      const matchesYear = year ? item.year === year : true;
      return matchesTitle && matchesYear;
    });
  }
}
