import { ToastState } from '../state';
import { ActionResult, ActionsType } from 'hyperapp';
import { TOAST_DURATION } from '../constants';

enum ToastLevel {
  Info = 'info',
  Success = 'success',
  Warn = 'warning',
  Error = 'danger',
}

export interface ToastMessage {
  message: string;
  title?: string;
}

export interface Toast extends ToastMessage {
  id: number;
  type: ToastLevel;
}

export interface ToastActions {
  info: (toast: ToastMessage) =>
    (state: ToastState) =>
      ActionResult<ToastState>;

  success: (toast: ToastMessage) =>
    (state: ToastState) =>
      ActionResult<ToastState>;

  warning: (toast: ToastMessage) =>
    (state: ToastState) =>
      ActionResult<ToastState>;

  error: (toast: ToastMessage) =>
    (state: ToastState) =>
      ActionResult<ToastState>;

  hide: (index?: number) => (state: ToastState) => ActionResult<ToastState>;
}

/**
 * Adds the toasts and removes them after some time.
 *
 * @param toast
 * @param state
 * @param actions
 */
const addToast:
  (toast: Toast, state: ToastState, actions: ToastActions) => ToastState =
  (toast, state, actions) => {
    if (toast.type !== ToastLevel.Error) {
      setTimeout(
        () => {
          actions.hide(toast.id);
        },
        TOAST_DURATION,
      );
    }

    return {
      list: [toast, ...state.list],
    };
  };

const createToast = (message: string, title: string, type: ToastLevel): Toast => {
  const id = +new Date();
  return { id, message, title, type };
};

export const toastActions: ActionsType<ToastState, ToastActions> = {
  info: ({ message, title }) => (state, actions) => {
    const toast = createToast(message, title, ToastLevel.Info);
    return addToast(toast, state, actions);
  },

  success: ({ message, title }) => (state, actions) => {
    const toast = createToast(message, title, ToastLevel.Success);
    return addToast(toast, state, actions);
  },

  warning: ({ message, title }) => (state, actions) => {
    const toast = createToast(message, title, ToastLevel.Warn);
    return addToast(toast, state, actions);
  },

  error: ({ message, title }) => (state, actions) => {
    const toast = createToast(message, title, ToastLevel.Error);
    return addToast(toast, state, actions);
  },

  hide: (id?: number) => ({ list }) => (
    { list: [...list.filter(t => t.id !== id)] }
    ),
};
