import { h, View } from 'hyperapp';
import { State } from './state';
import { Actions } from './actions';
import './styles/styles.scss';
import AuthenticationForm from './components/AuthenticationForm/AuthenticationForm';
import PlanningContainer from './components/PlanningContainer/PlanningContainer';

export const view: View<State, Actions> = (state, actions) => (
  <main>
    {!state.user.authenticated && <AuthenticationForm state={state.user} actions={actions.user} />}
    {state.user.authenticated && <PlanningContainer state={state} actions={actions} />}
  </main>
);
