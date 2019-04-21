import { ActionResult, ActionsType } from 'hyperapp';
import { PlanningViewState } from '../../state/view/planning-view.state';
import { Moment } from 'moment';

export interface PlanningViewActions {
  changeStartDate: (startDate: Moment) => (state: PlanningViewState) => ActionResult<PlanningViewState>;
}

export const planningViewActions: ActionsType<PlanningViewState, PlanningViewActions> = {
  changeStartDate: startDate => state => ({
    ...state,
    startDate,
  }),
};
