import { Component, h } from 'hyperapp';

interface Props {
  labelText: string;
  required?: boolean;
  hint?: string;
}

export const FormField: Component<Props> = ({ labelText, required = false, hint }, children) => (
  <div className="field">
    <label className="label" title={required ? 'Required' : null}>
      {labelText}
      {required && <span class="label-asterisk">*</span>}
    </label>
    <div className="control">
      {children}
    </div>
    <p className="help">{hint}</p>
  </div>
);
