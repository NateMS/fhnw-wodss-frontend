import { Component, h } from 'hyperapp';
import './Avatar.scss';
import { getRandomHexColor } from '../../utils';

interface Props {
  fullName: string;
  size?: string;
}

export const Avatar: Component<Props> = ({ fullName, size }) => {
  const split = fullName.split(' ');
  const firstChar = split[0].charAt(0).toUpperCase();
  const secondChar = split[1].charAt(0).toUpperCase();
  const initials = `${firstChar}${secondChar}`;
  const className = `avatar is-${size ? size : 'normal'}`;
  const backgroundColor = `background-color: ${getRandomHexColor(fullName)}`;

  return (
    <div className={className} style={backgroundColor}>
      <span className="avatar-initials">{initials}</span>
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
