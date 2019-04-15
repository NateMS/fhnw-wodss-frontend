import { Component, h } from 'hyperapp';
import { Redirect } from '@hyperapp/router';
import { ViewProps } from './ViewProps';
import Navigation from '../components/Navigation/Navigation';
import UserLauncher from '../components/UserLauncher/UserLauncher';
import { Spinner } from '../components/Spinner/Spinner';

/**
 * Protects the view from being accessed without being authenticated.
 * @param View
 */
export const protect = (View: Component<ViewProps>) => (props: ViewProps) => {
  return ProtectedView(props, View);
};

/**
 * Higher order component that checks whether the user
 * is authenticated, before rendering its children.
 *
 * @param state
 * @param actions
 * @param children
 * @constructor
 */
export const ProtectedView: Component<ViewProps> = ({ state, actions }, children) => {
  const authenticated = state.user.authenticated;

  if (authenticated === null) {
    return <Spinner isLoading={true} />;
  }

  if (authenticated === false) {
    // Redirects to login page
    return <Redirect to="/" />;
  }

  // Render the actual view
  return (
    <div className="app">
      <div className="app__sidebar">
        <Navigation state={state} />
        <UserLauncher state={state.user} />
      </div>
      <div className="app__body">
        {children({ state, actions })}
      </div>
    </div>
  );
};

export default ProtectedView;
