import type { AwardsRepository } from "#/repositories/awards-repository";
import {
  getProducerIntervals,
  type ProducerInterval,
} from "#/utils/get-producer-intervals";
import lodash from "lodash";

interface Response {
  min: ProducerInterval[];
  max: ProducerInterval[];
}

export class GetAwardIntervalsUseCase {
  constructor(private awardsRepository: AwardsRepository) {}

  async execute(): Promise<Response> {
    const awards = await this.awardsRepository.findAll({ winner: true });

    const intervals = getProducerIntervals(awards);
    const maxInterval = lodash.maxBy(intervals, "interval")?.interval;
    const minInterval = lodash.minBy(intervals, "interval")?.interval;
    
    const min: ProducerInterval[] = [
      ...intervals.filter(({ interval }) => interval === minInterval),
    ];
    const max: ProducerInterval[] = [
      ...intervals.filter(({ interval }) => interval === maxInterval),
    ];

    return {
      min,
      max,
    };
  }
}
