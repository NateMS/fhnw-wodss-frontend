import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import { Actions } from '../../actions';
import { Spinner } from '../../components/Spinner/Spinner';
import { AvatarItem } from '../../components/Avatar/Avatar';

const onRender = (actions: Actions) => {
  actions.employee.fetchAll();
  actions.contract.fetchAll();
  actions.project.fetchAll();
  actions.allocation.fetchAll();
};

const ProfileDetail: Component<ViewProps> = ({ state }) => {
  const employee = state.user.employee!;

  return (
    <div>
      <div class="field is-horizontal">
        <div class="field-label" />
        <div class="field-body">
          <div class="field">
            <AvatarItem fullName={employee.fullName} />
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">E-Mail:</label>
        </div>
        <div class="field-body">
          <div class="field">
            {employee.emailAddress}
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Role:</label>
        </div>
        <div class="field-body">
          <div class="field">
            {employee.roleName}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Profile: Component<ViewProps> = ({ state, actions }) => {
  const isLoading = state.employee.isLoading ||
    state.contract.isLoading ||
    state.project.isLoading ||
    state.allocation.isLoading;

  return (
    <div oncreate={() => onRender(actions)}>
      <div className="view-container">
        <h1 className="title">Profile</h1>
        {isLoading && <Spinner isLoading={true} />}
        {!isLoading && <ProfileDetail state={state} actions={actions} />}
      </div>
    </div>
  );
};

export default Profile;
