import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import { Actions } from '../../actions';
import { Spinner } from '../../components/Spinner/Spinner';
import Avatar from '../../components/Avatar/Avatar';
import ContractList from '../../components/ContractList/ContractList';

const onRender = (actions: Actions) => {
  actions.employee.fetchAll();
  actions.contract.fetchAll();
  actions.project.fetchAll();
  actions.allocation.fetchAll();
};

const ProfileDetail: Component<ViewProps> = ({ state }) => {
  const employee = state.user.employee!;

  return (
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <Avatar fullName={employee.fullName} />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{employee.fullName}</strong>
            <div>
              <div class="field">
                <label class="label">E-Mail</label>
                <div class="field">
                  {employee.emailAddress}
                </div>
              </div>
              <div class="field">
                <label class="label">Role</label>
                <div class="field">
                  {employee.roleName}
                </div>
              </div>
              <div class="field">
                <label class="label">Contracts</label>
                <div class="field">
                  <ContractList state={state} />
                </div>
              </div>
            </div>
          </p>
        </div>
      </div>
    </article>
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
