import { Component, h } from 'hyperapp';
import './Spinner.scss';

interface Props {
  isLoading: boolean;
}

export const Spinner: Component<Props> = ({ isLoading }) => (
  <div className={isLoading ? 'spinner is-loading' : 'spinner'} />
);
