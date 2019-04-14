import { Component, h } from 'hyperapp';

interface Props {
  labelText: string;
  required?: boolean;
}

export const FormField: Component<Props> = ({ labelText, required = false }, children) => (
  <div className="field">
    <label className="label" title={required ? 'Required' : null}>
      {labelText}
      {required && <span class="label-asterisk">*</span>}
    </label>
    {children}
  </div>
);
