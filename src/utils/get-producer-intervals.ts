import type { Award } from "#/models/award";
import { groupBy } from "lodash";

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export const getProducerIntervals = (awards: Award[]) => {
  const groupedByProducers = groupBy(awards, "producers");
  const intervals: ProducerInterval[] = [];

  for (const producer in groupedByProducers) {
    const sortedYears = groupedByProducers[producer]
      .map((award) => award.year)
      .sort((a, b) => a - b);

    sortedYears.slice(1).forEach((value, i) => {
      intervals.push({
        producer,
        interval: value - sortedYears[i],
        previousWin: sortedYears[i],
        followingWin: value,
      });
    });
  }

  return intervals;
};
