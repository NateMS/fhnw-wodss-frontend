import { Component, h } from 'hyperapp';
import { Button } from '../Button/Button';
import { Actions } from '../../actions';
import FormInput from '../FormInput/FormInput';
import { AuthenticationFormState } from '../../state/form/authentication-form.state';
import { EmployeeModel } from '../../api/dto/employee.model';

interface Props {
  state: AuthenticationFormState;
  actions: Actions;
}

const submit = (event: Event, state: AuthenticationFormState, actions: Actions) => {
  event.stopPropagation();
  event.preventDefault();

  const { authentication: formActions } = actions.form;
  const { emailAddress, rawPassword } = state.controls;

  if (emailAddress.value == null || rawPassword.value == null) {
    return;
  }

  formActions.setSaving(true);

  actions.user.login({
    rawPassword: rawPassword.value,
    emailAddress: emailAddress.value,
  })
  .then((employee: EmployeeModel) => {
    formActions.setSaving(false);
    // Reset form
  }).catch(() => {
    formActions.setSaving(false);
  });
};

const AuthenticationForm: Component<Props> = ({ state, actions }) => {
  const form = state;
  const { emailAddress, rawPassword } = form.controls;
  const { authentication: formActions } = actions.form;

  return (
    <form onsubmit={(event: Event) => submit(event, state, actions)}>
      <h1 className="title">Project Management Login</h1>
      <div className="field">
        <div className="control">
          <FormInput
            name={emailAddress.name}
            value={emailAddress.value}
            placeholder="Email"
            type="text"
            disabled={form.isSaving}
            isLoading={form.isSaving}
            onInputChange={formActions.updateValue}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <FormInput
            name={rawPassword.name}
            value={rawPassword.value}
            type="password"
            placeholder="Password"
            disabled={form.isSaving}
            isLoading={form.isSaving}
            onInputChange={formActions.updateValue}
          />
        </div>
      </div>
      <div className="field buttons">
        <Button
          label="Login"
          theme="primary"
          type="submit"
          isLoading={form.isSaving}
          disabled={form.isSaving}
        />
      </div>
    </form>
  );
};

export default AuthenticationForm;
