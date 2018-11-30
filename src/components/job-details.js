import React from 'react'
import Editor from './editor'
import Scheduler from './scheduler'
import TaskEditor from './task-editor'
import {JobsById, TasksById} from '../utilities/data'

class JobDetails extends React.Component {
  state = {
    detail_mode: "schedule",
    job_data: {}
  }

  componentDidMount () {
    if (this.props.selected_job && JobsById[this.props.selected_job].start_date) {
      this.setState({
        detail_mode: "task"
      })
    }
  }

  changeMode (mode) {
    this.setState({
      detail_mode: mode
    });
  }
  handleJobClick = (project_id, id) => {
    this.props.handleJobClick(project_id, id);
  }
  updateJobProgress = (job_id, tasks, progress) => {
    JobsById[job_id].progress = progress;
    let task_ids = [];
    let task;
    for (let t=0; t<tasks.length; t++) {
      task = tasks[t];
      task_ids.push(task.id);
      TasksById[task.id] = {...task};
    }
    JobsById[job_id].tasks = task_ids;
    this.props.updateJob(job_id, {...JobsById[job_id]});
  }

  render () {
    return (
      <div className={"job-detail-panel" +
        (this.props.selected_job?"":" open") +
        (" show-content")
      }>
        { this.props.selected_job?(
          <div>
            <div>
              <header>
                <h2>{JobsById[this.props.selected_job].name}</h2>
                <div>
                  <button className={this.state.detail_mode === "schedule"?"selected":""} onClick={()=>{this.changeMode("schedule")}}>schedule job</button>
                  <button className={this.state.detail_mode === "task"?"selected":""} onClick={()=>{this.changeMode("task")}}>manage tasks</button>
                  <button className={this.state.detail_mode === "note"?"selected":""} onClick={()=>{this.changeMode("note")}}>take notes</button>
                </div>
              </header>
              <div className="tab-panel">
                <div className={this.state.detail_mode === "note"?"show":""}>
                  {
                    this.state.detail_mode === "note"?
                      (<Editor
                        value="These are some notes!"
                        onChange={(value)=>{console.log(value);}}
                      />)
                    :
                      []
                  }
                </div>
                <div className={this.state.detail_mode === "task"?"show":""}>
                  {
                    this.state.detail_mode === "task"?
                      (<TaskEditor
                        selected_job={this.props.selected_job}
                        selected_job_data={JobsById[this.props.selected_job]}
                        default_trade={JobsById[this.props.selected_job].default_trade}
                        updateJobProgress={this.updateJobProgress}
                       />)
                    :
                      []
                  }
                </div>
                <div className={this.state.detail_mode === "schedule"?"show":""}>
                  {
                    this.state.detail_mode === "schedule"?
                      (<Scheduler
                        selected_job={this.props.selected_job}
                        selected_job_data={JobsById[this.props.selected_job]}
                        default_trade={JobsById[this.props.selected_job].default_trade}
                        handleJobClick={this.handleJobClick}
                       />)
                    :
                      []
                  }
                </div>
              </div>
            </div>
          </div>
        ):[]}
      </div>
    );
  }
}

export default JobDetails
