import { app } from 'hyperapp';
import { state, State } from './state';
import { actions, Actions } from './actions';
import { view } from './app';

app<State, Actions>(state, actions, view, document.body);
