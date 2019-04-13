import { h, View } from 'hyperapp';
import { Route } from '@hyperapp/router';
import { State } from './state';
import { Actions } from './actions';
import './styles/styles.scss';
import Planning from './views/Planning/Planning';
import Projects from './views/Projects/Projects';
import Employees from './views/Employees/Employees';
import Login from './views/Login/Login';
import Logout from './views/Logout/Logout';
import { protect } from './views/ProtectedView';
import ToastList from './components/ToastList/ToastList';
import Profile from './views/Profile/Profile';

export const view: View<State, Actions> = (state, actions) =>  {
  const { authenticated } = state.user;

  if (authenticated === null) {
    // Tries to restore a previous session
    actions.user.restore();
  }

  return (
    <main class="app-container">
      <Route path="/planning" render={() => protect(Planning)({ state, actions })} />
      <Route path="/projects" render={() => protect(Projects)({ state, actions })} />
      <Route path="/employees" render={() => protect(Employees)({ state, actions })} />
      <Route path="/profile" render={() => protect(Profile)({ state, actions })} />
      <Route path="/logout" render={() => protect(Logout)({ state, actions })} />
      <Route path="/" render={() => Login({ state, actions })} />
      <ToastList state={state.toast} />
    </main>
  );
};
