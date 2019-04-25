import { ActionResult, ActionsType } from 'hyperapp';
import { PlanningViewState } from '../../state/view/planning-view.state';
import moment, { Moment } from 'moment';
import { Actions } from '../index';

export interface PlanningViewActions {
  changeStartDate: (startDate: Moment) => (state: PlanningViewState) => ActionResult<PlanningViewState>;
}

export const planningViewActions: ActionsType<PlanningViewState, PlanningViewActions> = {
  changeStartDate: startDate => state => ({
    ...state,
    startDate: startDate.startOf('day'),
  }),
};

export const showPrevious = (startDate: Moment, numberOfDays: number, actions: Actions): void => {
  actions.view.planning.changeStartDate(
    moment(startDate)
      .subtract(numberOfDays, 'days'),
  );
};

export const showNext = (startDate: Moment, numberOfDays: number, actions: Actions): void => {
  actions.view.planning.changeStartDate(
    moment(startDate)
      .add(numberOfDays, 'days'),
  );
};
