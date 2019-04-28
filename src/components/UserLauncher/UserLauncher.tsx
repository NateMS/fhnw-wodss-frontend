import { Component, h } from 'hyperapp';
import { Link } from '@hyperapp/router';
import { UserState } from '../../state';
import Avatar from '../Avatar/Avatar';
import './UserLauncher.scss';

interface Props {
  state: UserState;
}

const UserLauncher: Component<Props> = ({ state }) => {
  const employee = state.employee;

  return (
    <div className="user-launcher">

      <div className="dropdown is-up is-hoverable">
        <div className="dropdown-trigger">
          <Avatar fullName={employee!.fullName} />
        </div>
        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <strong>{employee!.fullName}</strong>
              <br />
              {employee!.roleName}
            </div>
            <div className="dropdown-item">
              <Link to="/profile">Profile</Link>
            </div>
            <div className="dropdown-item">
              <Link to="/logout">Logout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLauncher;
