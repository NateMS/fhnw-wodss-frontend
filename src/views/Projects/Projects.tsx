import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectModalForm from '../../components/ProjectModelForm/ProjectModalForm';
import { Actions } from '../../actions';
import Button from '../../components/Button/Button';
import { Spinner } from '../../components/Spinner/Spinner';
import { showProjectCreateForm } from '../../actions/form/project-form.actions';

const onRender = (actions: Actions) => {
  actions.employee.fetchAll();
  actions.contract.fetchAll();
  actions.project.fetchAll();
  actions.allocation.fetchAll();
};

export const Projects: Component<ViewProps> = ({ state, actions }) => {
  const { filterString } = state.view.projects;
  const isLoading = state.employee.isLoading ||
    state.contract.isLoading ||
    state.project.isLoading ||
    state.allocation.isLoading;

  return (
    <div oncreate={() => onRender(actions)}>
      <div className="view-container">
        <h1 className="title">Projects</h1>
        <div className="view__actions">
          <input
            type="text"
            className="input view__filter"
            placeholder="Filter"
            value={filterString}
            onInput={(e: any) => actions.view.projects.updateFilterString(e.target.value)}
          />
          <Button
            theme="primary"
            label="Create"
            onClick={() => showProjectCreateForm(true, actions)}
          />
        </div>
        {isLoading && <Spinner isLoading={true} />}
        {!isLoading && <ProjectList state={state} actions={actions} />}
      </div>
      <ProjectModalForm state={state} actions={actions} />
    </div>
  );
};

export default Projects;
