import { Component, h } from 'hyperapp';
import { Link } from '@hyperapp/router';
import ToolTip from '../ToolTip/ToolTip';

export interface NavigationItemProps {
  pathName: string;
  label: string;
  icon: string;
  active: boolean;
  key?: string;
}

export const NavigationItem: Component<NavigationItemProps> = ({ pathName, label, active, icon }) => {
  const className = active ? 'navigation__item navigation__item--active' : 'navigation__item';

  const linkProps = {
    className: 'navigation__item-link',
    to: pathName,
  };

  return (
    <ToolTip content={label} placement="right">
      <li className={className}>
        <Link {...linkProps}>
          <span className="icon">
            <i className={icon} aria-hidden="true" />
          </span>
        </Link>
      </li>
    </ToolTip>
  );
};

export default NavigationItem;
