import { Component, h } from 'hyperapp';
import { Redirect } from '@hyperapp/router';
import AuthenticationForm from '../../components/AuthenticationForm/AuthenticationForm';
import { ViewProps } from '../ViewProps';

export const Login: Component<ViewProps> = ({ state, actions }) => {
  const employee = state.user.employee;

  if (employee != null) {
    return <Redirect to="/planning" />;
  }

  return (
    <div className="login-container">
      <AuthenticationForm state={state.form.authentication} actions={actions} />
    </div>
  );
};

export default Login;
