import React from 'react'
import {DaysInMonth, SameDay} from '../utilities/date'
import {Content} from '../utilities/content'

const WeekDaysShort = Content[window.loc].WeekDaysShort;

class UserHeatmapDates extends React.Component {
  state = {
    selected_day: 0
  };

  componentDidUpdate(prevProps) {
    if (this.props.selected_day && this.props.selected_day !== prevProps.selected_day) {
      this.setState({
        selected_day: this.props.selected_day
      });
    }
  }

  handleDayClick = (e) => {
    const id=parseInt(e.currentTarget.dataset.id,10);
    this.props.handleDayClick(id)
  }

  render() {
    const cells = [];
    const day_cells = [];

    for (var i=0; i<DaysInMonth(this.props.month, this.props.year); i++) {
      var current_date = new Date(this.props.year, this.props.month, (i+1));
      cells.push((
        <li key={i+1} data-id={(i+1)} className={
          "cell" +
          ((current_date.toDateString() === (new Date()).toDateString()) ? " today" : "") +
          (this.props.selected_job_data && this.props.selected_job_data.start_date && SameDay(this.props.selected_job_data.start_date, current_date) ? " assigned" : "")
        } onClick={this.handleDayClick}>
          <span>{i+1}</span>
          <small>{WeekDaysShort[current_date.getDay()]}</small>
        </li>
      ));
    }

    if (this.state.selected_day) {
      for (var h=0; h<24; h++) {
        const current_time = new Date(this.props.year, this.props.month, this.state.selected_day, h);
        day_cells.push((
          <li key={h} className={
            "day-cell"
          }>
            <span>{(current_time.getHours() % 12 || 12) + " " + (current_time.getHours() >= 12 ? "pm" : "am")}</span>
          </li>
        ));
      }
    }

    return (
      <div className={"user-schedule heatmap-dates" + (this.props.selected_day ? " show-day" : "")}>
        { this.props.selected_day ? (
          <ul className={"day-schedule"}
            style={{
              // transformOrigin: ((this.state.selected_day/DaysInMonth(this.props.month, this.props.year))*100) + "% 0"
              // transition: "opacity .5s ease, transform 0s ease 1s"
            }}>
            {day_cells}
          </ul>
        ):(
          <ul className={"month-schedule"}>
            {cells}
          </ul>
        )}
      </div>
    );
  }
}

export default UserHeatmapDates
