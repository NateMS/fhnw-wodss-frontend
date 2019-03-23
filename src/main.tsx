import { app } from 'hyperapp';
import { location } from '@hyperapp/router';
import { state, State } from './state';
import { actions, Actions } from './actions';
import { view } from './app';

const main = app<State, Actions>(state, actions, view, document.body);
location.subscribe(main.location);
