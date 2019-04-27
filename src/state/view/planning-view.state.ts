import moment, { Moment } from 'moment';

export interface PlanningViewState {
  startDate: Moment;
  granularity: number;
  filterString: string;
}

export const defaultPlanningViewState: PlanningViewState = {
  startDate: moment()
    .startOf('day'),
  granularity: 30,
  filterString: '',
};
