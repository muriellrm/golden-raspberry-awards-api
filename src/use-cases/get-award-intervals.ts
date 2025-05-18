import type { AwardsRepository } from "#/repositories/awards-repository";
import {
  getProducerIntervals,
  type ProducerInterval,
} from "#/utils/get-producer-intervals";
import { groupBy, maxBy, minBy } from "lodash";

interface Response {
  min: ProducerInterval[];
  max: ProducerInterval[];
}

export class GetAwardIntervalsUseCase {
  constructor(private awardsRepository: AwardsRepository) {}

  async execute(): Promise<Response> {
    const awards = await this.awardsRepository.findAll({ winner: true });

    const min: ProducerInterval[] = [];
    const max: ProducerInterval[] = [];
    const intervals = getProducerIntervals(awards);
    const groupedIntervals = groupBy(intervals, "producer");

    Object.entries(groupedIntervals).forEach(([_, items]) => {
      const maxInterval = maxBy(items, "interval");
      const minInterval =
        items.length > 1 ? minBy(items, "interval") : undefined;

      if (maxInterval) {
        max.push(maxInterval);
      }

      if (minInterval && minInterval !== maxInterval) {
        min.push(minInterval);
      }
    });

    return {
      min,
      max,
    };
  }
}
