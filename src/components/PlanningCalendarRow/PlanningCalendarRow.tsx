import { Component, h } from 'hyperapp';
import moment, { Moment } from 'moment';
import './PlanningCalendarRow.scss';
import ToolTip from '../ToolTip/ToolTip';
import { PlanningViewActions, showNext, showPrevious } from '../../actions/view/planning-view.actions';
import DatePicker from '../DatePicker/DatePicker';

interface Props {
  startDate: Moment;
  numberOfDays: number;
  actions: PlanningViewActions;
}

const createDayColumn = (day: Moment) => {
  const today = moment();
  const isToday = today.isSame(day, 'day');

  const col = (
    <div className="planning-col planning-col--day">
      <span className="planning-col__week-day">
        {day.format('dd')}
      </span>
      <span className="planning-col__day">
        {day.format('D')}
      </span>
      {day.isSame(today, 'day') && <div className="planning-col__line" />}
    </div>
  );

  return isToday ? <ToolTip content="Today" placement="bottom">{col}</ToolTip> : col;
};

export const PlanningCalendarRow: Component<Props> = (props) => {
  const { startDate, numberOfDays, actions } = props;
  const today = moment();

  const days: Moment[] = Array.from(Array(numberOfDays), (_, index) => {
    return moment(startDate).add(index, 'days');
  });

  const months: Map<string, number> = new Map();

  days.forEach((day) => {
    const monthLabel = day.format('MMMM YYYY');
    const monthDays = months.get(monthLabel) || 0;
    months.set(monthLabel, monthDays + 1);
  });

  return (
    <div className="planning-calendar-row">
      <div className="planning-row planning-row--months">
        <div className="planning-col planning-col--label" />
        {[...months.entries()].map(([month, counter]) => (
          <div className="planning-col" style={`flex-grow: ${counter}`}>
           {month}
          </div>
        ))}
      </div>
      <div className="planning-row planning-row--days">
        <div className="planning-col planning-col--actions">
          <ToolTip content={`Previous ${numberOfDays} days`} placement="bottom">
            <button
              className="button"
              onclick={() => showPrevious(startDate, numberOfDays, actions)}
            >
              <span className="icon">
                <i className="fas fa-caret-left"/>
              </span>
            </button>
          </ToolTip>
          <ToolTip content="Today" placement="bottom">
            <button
              className="button"
              onclick={() => actions.changeStartDate(today)}
            >
              <span className="icon">
                <i className="fas fa-dot-circle"/>
              </span>
            </button>
          </ToolTip>
          <DatePicker
            name="startDate"
            value={startDate}
            onInputChange={control => actions.changeStartDate(control.value!)}
          />
          <ToolTip content={`Next ${numberOfDays} days`} placement="bottom">
            <button
              className="button"
              onclick={() => showNext(startDate, numberOfDays, actions)}
            >
              <span className="icon">
                <i className="fas fa-caret-right"/>
              </span>
            </button>
          </ToolTip>
        </div>
        {days.map(day => createDayColumn(day))}
      </div>
    </div>
  );
};

export default PlanningCalendarRow;
