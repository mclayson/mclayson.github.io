import React from 'react'
import {WEEKEND, DAILY_WORK_HOURS} from '../config/account-settings'
import {DaysInMonth, SameDay} from '../utilities/date'
import {JobsById} from '../utilities/data'

class Scheduler extends React.Component {
  state = {
    selected_day:0,
    jobs_by_day:[],
    jobs_by_id:{}
  };

  calcJobsByDay () {
    var jobs_by_day = [];
    for (var d=0; d<DaysInMonth(this.props.month, this.props.year); d++) {
      jobs_by_day.push([]);
    }

    for (var t=0; t<this.props.user.jobs.length; t++) {
      const job_id = this.props.user.jobs[t];
      let job = JobsById[job_id];
      if (job.start_date && job.start_date.getMonth() === this.props.month) {
        jobs_by_day[job.start_date.getDate()-1].push(job);
      }
    }
    return jobs_by_day;
  }
  componentDidMount() {
    var jobs_by_day = this.calcJobsByDay();
    // setTimeout(()=>{
      this.setState({
        jobs_by_day: jobs_by_day
      });

    if (this.props.selected_day) {
      this.setState({
        selected_day: this.props.selected_day
      });
    }
    // }, 100);
  }

  componentDidUpdate(prevProps) {
    if (this.props.month !== prevProps.month) {
      this.setState({
        jobs_by_day: this.calcJobsByDay()
      });
    }
    if (this.props.selected_day && this.props.selected_day !== prevProps.selected_day) {
      this.setState({
        selected_day: this.props.selected_day
      });
    }
  }

  handleDayClick = (e) => {
    const id=parseInt(e.currentTarget.dataset.id,10);
    const index=parseInt(e.currentTarget.dataset.index,10);
    this.props.handleDayClick(id, index);
  }
  handleJobClick = (e) => {
    const id=e.currentTarget.dataset.id;
    const project_id=e.currentTarget.dataset.project;
    this.props.handleJobClick(project_id, id);
  }

  render() {
    const cells = [];
    const day_cells = [];
    const classes = [
      "jobs-0",
      "jobs-1",
      "jobs-2",
      "jobs-3",
      "jobs-4",
      "jobs-5",
      "jobs-6",
      "jobs-7",
      "jobs-8"
    ];

    if (!this.props.selected_day && this.state.jobs_by_day && this.state.jobs_by_day.length === DaysInMonth(this.props.month, this.props.year)) {
      for (var i=0; i<DaysInMonth(this.props.month, this.props.year); i++) {

        const current_date = new Date(this.props.year, this.props.month, (i+1));
        let value = 0;
        for (var t=0; t<this.state.jobs_by_day[i].length; t++) {
          const job = this.state.jobs_by_day[i][t];
          const job_duration = (((job.end_date-job.start_date)/1000)/60/60);
          value+=job_duration;
        }
        let weekend = "";
        // value = Math.max(value,0);
        for (var w=0; w<WEEKEND.length; w++) {
          if (current_date.getDay() === WEEKEND[w]) {
            // value = 0;
            weekend = " weekend";
          }
        }
        cells.push((
          <li
            key={this.props.user.id + "_" + i}
            data-id={(i+1)}
            data-index={(this.props.index)}
            className={"cell " +
              (classes[Math.min(Math.round(value*8/DAILY_WORK_HOURS),classes.length-1)]) +
              weekend +
              (((current_date.toDateString() === (new Date()).toDateString()) || (((this.props.month/20)+this.props.year) > (((new Date()).getMonth()/20)+(new Date()).getFullYear()) && i===0)) ? " today" : "") +
              (this.props.selected_job_data && this.props.selected_job_data.start_date && SameDay(this.props.selected_job_data.start_date, current_date) && this.props.selected_job_data.assigned_user === this.props.user.id ? " assigned" : "")
          } onClick={this.handleDayClick}
          >{
            value?(Math.round(value*10)/10)+" hrs":""
          }</li>
        ));
      }
    }

    if (this.state.selected_day) {
      // The Day view

      for (var h=0; h<24; h++) {
        // const current_time = new Date(this.props.year, this.props.month, this.state.selected_day, h);
        day_cells.push((
          <li
            key={"hour-"+h}
            className={
              "day-cell"
            }
          >
          </li>
        ));
      }
      if (this.state.jobs_by_day[this.state.selected_day-1]) {
        //Represent Jobs on Day View
        for (t=0; t<this.state.jobs_by_day[this.state.selected_day-1].length; t++) {
          const job = this.state.jobs_by_day[this.state.selected_day-1][t];
          const job_duration = (((job.end_date-job.start_date)/1000)/60/60/24)*100;
          const job_start = ((job.start_date - new Date(this.props.year, this.props.month, this.state.selected_day))/1000/60/60/24)*100;
          // if (this.props.user.trade_name !== "Customer" || job.project_id === this.props.selected_job_data.project_id) {
            day_cells.push((
              <li
                key={"job-"+job.id}
                data-id={job.id}
                data-project={job.project_id}
                className={
                  "job" +
                  (job.id === this.props.selected_job? " selected" : "")
                }
                style={{
                  left: job_start+"%",
                  maxWidth: job_duration+"%",
                  minWidth: job_duration+"%",
                  backgroundColor: job.project_color
                }}
                onClick={
                  this.handleJobClick
                }
              >
                <h4>
                  <i className={job.icon}></i>
                  <span><strong>{job.name}</strong></span>
                </h4>
                <div>{job.project_name}</div>
              </li>
            ));
          // }
        }
      }
    }

    return (
      <div className={"user-schedule" + (this.props.selected_day ? " show-day" : "")}>
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

export default Scheduler
