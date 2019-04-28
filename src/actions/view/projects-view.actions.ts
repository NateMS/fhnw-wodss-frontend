import { ActionResult, ActionsType } from 'hyperapp';
import { ProjectsViewState } from '../../state/view/projects-view.state';

export interface ProjectsViewActions {
  updateFilterString: (filterString: string) => (state: ProjectsViewState) => ActionResult<ProjectsViewState>;
}

export const projectsViewActions: ActionsType<ProjectsViewState, ProjectsViewActions> = {
  updateFilterString: filterString => () => ({
    filterString,
  }),
};
