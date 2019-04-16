import { Component, h } from 'hyperapp';
import './Notification.scss';

interface NotificationProps {
  key: number;
  message: string;
  theme: string;
  title?: string;
  onClose?: () => void;
}

interface CloseButtonProps {
  onClose?: () => void;
}

const CloseButton: Component<CloseButtonProps> = ({ onClose }) => {
  const onClick = () => onClose ? onClose() : () => {};

  return (
    <button type="button" onclick={() => onClick()} className="delete">
      <i className="fas fa-times"/>
    </button>
  );
};

export const Notification: Component<NotificationProps> = ({ message, title, theme, onClose }) => {
  return (
    <div className={`notification is-${theme}`}>
      {onClose && <CloseButton onClose={onClose} />}
      {title && <span className="notification__title">{title}</span>}
      {message}
    </div>
  );
};

export default Notification;
