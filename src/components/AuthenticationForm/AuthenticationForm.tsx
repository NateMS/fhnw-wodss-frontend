import { Component, h } from 'hyperapp';
import { Button } from '../Button/Button';
import { FormState } from '../../state/form';
import { Actions } from '../../actions';
import FormInput from '../FormInput/FormInput';

interface Props {
  state: FormState;
  actions: Actions;
}

const submit = (state: FormState, actions: Actions) => {
  const { emailAddress, rawPassword } = state.authentication;

  if (emailAddress == null || rawPassword == null) {
    return;
  }

  updateField(actions, 'isSaving', true);

  actions.user.login({
    rawPassword,
    emailAddress,
  }).then((employee) => {
    updateField(actions, 'isSaving', false);
    actions.form.reset('authentication');
    // Reset form
  }).catch(() => {
    updateField(actions, 'isSaving', false);
  });
};

const updateField = (actions: Actions, fieldName: string, value: any) => {
  actions.form.updateField({
    fieldName,
    value,
    formName: 'authentication',
  });
};

const AuthenticationForm: Component<Props> = ({ state, actions }) => {
  const form = state.authentication;

  return (
    <form>
      <h1 className="title">Project Management Login</h1>
      <div className="field">
        <div className="control">
          <FormInput
            fieldName="emailAddress"
            placeholder="Email"
            type="text"
            value={form.emailAddress}
            disabled={form.isSaving}
            isLoading={form.isSaving}
            onInputChange={(value: string) => updateField(actions, 'emailAddress', value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <FormInput
            fieldName="password"
            type="password"
            placeholder="Password"
            value={form.rawPassword}
            disabled={form.isSaving}
            isLoading={form.isSaving}
            onInputChange={(value: string) => updateField(actions, 'rawPassword', value)}
          />
        </div>
      </div>
      <div className="field buttons">
        <Button
          label="Login"
          theme="primary"
          isLoading={form.isSaving}
          disabled={form.isSaving}
          onClick={() => submit(state, actions)}
        />
      </div>
    </form>
  );
};

export default AuthenticationForm;
