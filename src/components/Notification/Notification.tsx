import { Component, h } from 'hyperapp';

interface NotificationProps {
  text: string;
  theme: string;
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

export const Notification: Component<NotificationProps> = ({ text, theme, onClose }) => (
  <div className={`notification is-${theme}`}>
    {onClose && <CloseButton onClose={onClose} />}
    {text}
  </div>
);

export default Notification;
