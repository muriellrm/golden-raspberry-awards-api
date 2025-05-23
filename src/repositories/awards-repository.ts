import type { Award } from "#/models/award";

export interface QueryAll {
  title?: string;
  year?: number;
  winner?: boolean;
}
export type AwardInputRequest = Omit<Award, "id">;

export interface AwardsRepository {
  findAll(query: QueryAll): Promise<Award[]>;
  create(data: AwardInputRequest): Promise<Award>;
  import(data: AwardInputRequest[]): Promise<void>;
}
