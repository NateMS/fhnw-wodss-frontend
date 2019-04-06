import { Component, h } from 'hyperapp';
import { Link, LocationState } from '@hyperapp/router';
import ToolTip from '../ToolTip/ToolTip';
import './Navigation.scss';

interface Props {
  state: LocationState;
}

interface NavigationItem {
  pathName: string;
  label: string;
  icon: string;
  active: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    pathName: '/planning',
    label: 'Planning',
    icon: 'fas fa-lg fa-calendar-alt',
    active: false,
  },
  {
    pathName: '/projects',
    label: 'Projects',
    icon: 'fab fa-lg fa-buffer',
    active: false,
  },
  {
    pathName: '/employees',
    label: 'Employees',
    icon: 'fas fa-lg fa-users',
    active: false,
  },
];

const NavigationItem: Component<NavigationItem> = ({ pathName, label, active, icon }) => {
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

const Navigation: Component<Props> = (state) => {
  const activePathName = state.state.pathname;

  return (
    <div className="navigation">
      <ul>
        {navigationItems.map(item => <NavigationItem key={item.pathName} {...item} active={item.pathName === activePathName} />)}
      </ul>
    </div>
  );
};

export default Navigation;
