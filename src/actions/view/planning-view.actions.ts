import { ActionResult, ActionsType } from 'hyperapp';
import { PlanningViewState } from '../../state/view/planning-view.state';
import moment, { Moment } from 'moment';
import { EmployeesViewState } from '../../state/view/employees-view.state';

export interface PlanningViewActions {
  changeStartDate: (startDate: Moment) => (state: PlanningViewState) => ActionResult<PlanningViewState>;
  updateFilterString: (filterString: string) => (state: EmployeesViewState) => ActionResult<EmployeesViewState>;
}

export const planningViewActions: ActionsType<PlanningViewState, PlanningViewActions> = {
  changeStartDate: startDate => state => ({
    ...state,
    startDate: startDate.startOf('day'),
  }),

  updateFilterString: filterString => () => ({
    filterString,
  }),
};

export const showPrevious = (startDate: Moment, numberOfDays: number, actions: PlanningViewActions): void => {
  actions.changeStartDate(
    moment(startDate)
      .subtract(numberOfDays, 'days'),
  );
};

export const showNext = (startDate: Moment, numberOfDays: number, actions: PlanningViewActions): void => {
  actions.changeStartDate(
    moment(startDate)
      .add(numberOfDays, 'days'),
  );
};
