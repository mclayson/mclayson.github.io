import React from 'react'
import {Content} from '../utilities/content'
import {JobsById} from '../utilities/data'

const MonthNames = Content[window.loc].MonthNames;

class Projects extends React.Component {
  state = {
    loaded: false,
    selected_job: "none"
  };

  getJobData () {
    var months = {
      Unscheduled: []
    };
    var jobs_by_id = {};
    this.props.project_data.jobs.map((job_id, i) => {
      let job_insert = {
        ...JobsById[job_id]
      };
      jobs_by_id[job_insert.id] = job_insert;
      if (!job_insert.start_date) {
        months.Unscheduled.push(job_insert);
        return true;
      }
      let job_month = job_insert.start_date.getMonth();
      if (!months[job_month]) {
        months[job_month] = [];
      }
      months[job_month].push(job_insert);
      return true;
    });
    return [jobs_by_id, months];
  }

  componentDidMount() {
    var jobs_by_id = this.getJobData();
    this.setState({
      jobs_by_id: jobs_by_id[0],
      months: jobs_by_id[1],
      selected_job:this.props.selected_job
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected_job !== prevProps.selected_job) {
      this.setState({
        selected_job:this.props.selected_job
      });
    }
    if (this.props.project_data.id !== prevProps.project_data.id || this.props.refresh !== prevProps.refresh) {
      var jobs_by_id = this.getJobData();
      this.setState({
        jobs_by_id: jobs_by_id[0],
        months: jobs_by_id[1],
        selected_job:this.props.selected_job
      });
    }
  }


  selectJob = (e) => {
    let id=e.currentTarget.dataset.id;

    // if (this.state.selected_job!==id) {
      // this.setState({
      //   selected_job:id
      // });
      this.props.onSelectProject(this.props.id, id);
    // }
  }

  handleCloseButton = (e) => {
    this.props.onSelectProject(null, null);
  }


  render() {
    var display_months = [];
    var today = new Date();
    if (this.state.months) {
      var month_keys = Object.keys(this.state.months);
      var months = this.state.months;
      var after_today = false;
      month_keys.sort(function(a, b){return months[a] - months[b]});
      for (var i=0; i<month_keys.length; i++) {
        var month = this.state.months[month_keys[i]];
        month.sort(function(a, b){return a.start_date - b.start_date});
        for (var j=0; j<month.length; j++) {
          var job = month[j];
          var mark_today = "";
          if (!after_today && job.start_date && job.start_date >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            after_today = true;
            mark_today = " after-today";
          }
          display_months.push((
            <li
              key={job.id}
              data-id={job.id}
              className={
                (job.progress === 100 ? "complete" : job.progress > 0 ? "progress" : "") +
                (" "+month_keys[i]) +
                (job.start_date && (job.start_date.toDateString() === (new Date()).toDateString())?" today":"") +
                mark_today +
                (j === month.length-1?" last-of-month":"") +
                (job.id===this.state.selected_job?" selected":" not-selected") +
                ((j<month.length-1) && month[j+1].id===this.state.selected_job?" job-before-selected":"")
              }
              onClick={this.selectJob}
            >
              {
                j===0?<h3>{MonthNames[month_keys[i]] || month_keys[i]}</h3>:[]
              }
              <span className="h-line" />
              <span className="selected-arrow" />
              <span className="date">{(job.start_date ? job.start_date.getDate() : "")}</span>
              <div className="job-box">
                <h4><i className={job.icon}></i><span className="job-name">{job.name}</span></h4>
              </div>
              <span className="status">
                <span className="progress-bar" style={{transform:"scaleX("+(job.progress/100)+")"}}></span>
                <span className="status-text">{
                  job.progress===100 ?
                  (<i className="fas fa-check"></i>):
                  job.progress===0 ?
                  (""):
                  (job.progress + "%")
                }</span>
              </span>
            </li>
          ));
        };
      };
    }
    return (
      <article
        className={"project" +
          (this.props.last_selected?" last_selected":"")
      }>
        <header>
          <h2>{this.props.project_data.name}</h2>

            { this.props.selected_job && (
              <div className="button-menu">
                <button onClick={this.handleCloseButton} className="icon-button"><i className="fas fa-times"></i></button>
              </div>
            )}
        </header>
        <div className="header-color" style={{
          backgroundColor: this.props.project_data.color || "black"
        }} />
        <div className="timeline">
          {display_months}
        </div>
      </article>
    );
  }
}

export default Projects
