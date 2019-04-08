import { Component, h } from 'hyperapp';
import './Avatar.scss';

const colors = [
  '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
  '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
  '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6', '#f39c12',
  '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d',
];

interface Props {
  fullName: string;
  size?: string;
}

export const Avatar: Component<Props> = ({ fullName, size }) => {
  const split = fullName.split(' ');
  const firstChar = split[0].charAt(0).toUpperCase();
  const secondChar = split[1].charAt(0).toUpperCase();
  const initials = `${firstChar}${secondChar}`;
  const charIndex = firstChar.charCodeAt(0) - 65 + secondChar.charCodeAt(0) - 65;
  const colorIndex = charIndex % 19;
  const className = `avatar is-${size ? size : 'normal'}`;
  const backgroundColor = `background-color: ${colors[colorIndex]}`;

  return (
    <div className={className} style={backgroundColor}>
      <span className="avatar-initials">
        {initials}
      </span>
    </div>
  );
};

export const AvatarItem: Component<Props> = ({ fullName, size }) => {
  return (
    <div className="avatar-item">
      <Avatar fullName={fullName} size={size} />
      <div className="avatar-name">{fullName}</div>
    </div>
  );
};

export default Avatar;
