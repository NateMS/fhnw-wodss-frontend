import { Component, h } from 'hyperapp';
import './Navigation.scss';
import NavigationItem from './NavigationItem';
import { State } from '../../state';
import { Role } from '../../api/role';

interface Props {
  state: State;
}

export interface NavigationEntry {
  pathName: string;
  label: string;
  icon: string;
  active: boolean;
  isVisible: (role: Role) => boolean;
}

const navigationItems: NavigationEntry[] = [
  {
    pathName: '/planning',
    label: 'Planning',
    icon: 'fas fa-lg fa-calendar-alt',
    active: false,
    isVisible: () => true,
  },
  {
    pathName: '/projects',
    label: 'Projects',
    icon: 'fab fa-lg fa-buffer',
    active: false,
    isVisible: () => true,
  },
  {
    pathName: '/employees',
    label: 'Employees',
    icon: 'fas fa-lg fa-users',
    active: false,
    isVisible: () => true,
  },
];

const createNavigationItem = (item: NavigationEntry, activePathName: string, userRole: Role) => {
  if (item.isVisible(userRole) === true) {
    return (
      <NavigationItem
        key={item.pathName}
        pathName={item.pathName}
        label={item.label}
        icon={item.icon}
        active={item.pathName === activePathName}
      />
    );
  }
};

const Navigation: Component<Props> = ({ state }) => {
  const activePathName = state.location.pathname;
  const userRole = state.user.employee!.role;

  return (
    <div className="navigation">
      <ul>
        {navigationItems.map(item => createNavigationItem(item, activePathName, userRole))}
      </ul>
    </div>
  );
};

export default Navigation;
