import moment, { Moment } from 'moment';

export interface PlanningViewState {
  startDate: Moment;
  granularity: number;
}

export const defaultPlanningViewState: PlanningViewState = {
  startDate: moment(),
  granularity: 30,
};
