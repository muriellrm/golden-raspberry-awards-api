import type { Award } from "#/models/award";

export interface QueryAll {
  title?: string;
  year?: number;
}

export interface AwardsRepository {
  findAll(query: QueryAll): Promise<Award[]>;
}
