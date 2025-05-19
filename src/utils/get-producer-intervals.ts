import type { Award } from "#/models/award";
import _ from "lodash";

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export const getProducerIntervals = (awards: Award[]) => {
  const expandedAwards = awards.flatMap(award => {    
    const producersArray = award.producers.split(/,\s*|\s+and\s+/);
    return producersArray.map(producer => ({
      ...award,
      producers: producer,
    }));
  });

  const groupedByProducers = _.groupBy(expandedAwards, "producers");
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
