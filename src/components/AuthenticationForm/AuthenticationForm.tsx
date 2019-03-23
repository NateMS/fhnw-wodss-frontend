import { UserState } from '../../state';
import { UserActions } from '../../actions/user-actions';
import { Component, h } from 'hyperapp';
import { Button } from '../Button/Button';

export interface Props {
  state: UserState;
  actions: UserActions;
}

export const AuthenticationForm: Component<Props> = ({ state, actions }) => {
  return (
    <form>
      <h1 className="title">Please Login</h1>
      <div className="buttons">
        <Button
          label="Login"
          theme="primary"
          isLoading={state.loading}
          disabled={state.loading}
          onClick={() => actions.login()}
        />
      </div>
    </form>
  );
};

export default AuthenticationForm;
