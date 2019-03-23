import { Component, h } from 'hyperapp';
import { Redirect } from '@hyperapp/router';
import AuthenticationForm from '../../components/AuthenticationForm/AuthenticationForm';
import { ViewProps } from '../ViewProps';

export const Login: Component<ViewProps> = ({ state, actions }) => {
  const user = state.user.user;

  if (user != null) {
    return <Redirect to="/planning" />;
  }

  return (
    <div className="login-container">
      <AuthenticationForm state={state.user} actions={actions.user} />
    </div>
  );
};

export default Login;
