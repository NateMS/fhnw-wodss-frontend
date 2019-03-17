import { State } from '../../state';
import { Actions } from '../../actions';
import { Component, h } from 'hyperapp';
import { Button } from '../Button/Button';

interface Props {
  state: State;
  actions: Actions;
}

export const PlanningContainer: Component<Props> = ({ state, actions }) => {
  const user = state.user.user;

  if (user == null) {
    throw new Error('User has to be defined to view the Planning Container');
  }

  return (
    <div className="planning-container">
      <h1 className="title">Welcome {user.firstName}!</h1>
      <Button label="Logout" onClick={() => actions.user.logout()} />
    </div>
  );
};

export default PlanningContainer;
