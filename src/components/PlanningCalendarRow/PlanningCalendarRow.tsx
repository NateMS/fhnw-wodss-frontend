import { Component, h } from 'hyperapp';
import moment, { Moment } from 'moment';
import './PlanningCalendarRow.scss';

interface Props {
  startDate: Moment;
  numberOfDays: number;
}

export const PlanningCalendarRow: Component<Props> = (props) => {
  const { startDate, numberOfDays } = props;

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
        <div className="planning-col planning-col--label" />
        {days.map(day => (
          <div className="planning-col">
            <span className="planning-col__week-day">
              {day.format('dd')}
            </span>
              <span className="planning-col__day">
              {day.format('D')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanningCalendarRow;
