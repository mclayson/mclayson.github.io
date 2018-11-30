import React from 'react';
import Project from './project';
import JobDetails from './job-details';
import {ProjectList} from '../utilities/data'

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: 0,
      loaded: false,
      selected_job: null,
      last_selected_project: null
    };
  }
  componentDidMount() {
    setTimeout(()=>{
      var projects_by_id = {};
      for (var p=0;p<ProjectList.length; p++) {
        projects_by_id[ProjectList[p].id]=ProjectList[p];
      }
      this.setState({
        loaded: true,
        projects_by_id: projects_by_id
      });
    }, 50);
  }
  handleJobClick = (project_id, id) => {
    this.selectProject(project_id, id);
  }
  updateJob = (job_id, job) => {
    this.setState({
      refresh: Math.random()
    });
  }
  selectProject (id, job_id) {
    if (this.state.selected_project && (this.state.selected_project !== id)) {
      setTimeout(()=>{
        this.setState({
          transition_last_selected_project: false,
        });
      }, 50);
      setTimeout(()=>{
        this.setState({
          last_selected_project: this.state.selected_project
        });
      }, 1500);
    }
    this.setState({
      last_selected_project: this.state.selected_project ? this.state.selected_project : id,
      transition_last_selected_project: (this.state.selected_project && (this.state.selected_project !== id)),
      selected_project: id,
      selected_job: job_id
    });
  }
  render() {
    let projects = [];

    for (let p=0; p<ProjectList.length; p++) {
      projects.push((
        <div key={"project-"+ProjectList[p].id} className={"card" + (p<5?" d"+(p+1):" d5")}>
          <Project
            id={ProjectList[p].id}
            project_data={ProjectList[p]}
            onSelectProject={(id, job)=>{
              this.selectProject(id, job);
            }}
            refresh={this.state.refresh}
          />
        </div>
      ));
    }

    return (
      <div className={"projects " + (this.state.loaded?"loaded":"unloaded")}>
        {this.state.selected_job?(
          <div id="project-details" className={"card" + (this.state.selected_job?" show":"")}>
            <div className="header-color" style={{
              backgroundColor: this.state.projects_by_id[this.state.selected_project].color || "black"
            }} />

            <div className={ "selected_project" +
              (this.state.transition_last_selected_project ? " transition_last_selected" : "")
            }>
              {this.state.last_selected_project? (
                <Project
                  id={this.state.last_selected_project}
                  last_selected={true}
                  project_data={this.state.projects_by_id[this.state.last_selected_project]}
                  onSelectProject={(id, job)=>{
                    // this.selectProject(id, job);
                  }}
                  selected_job={this.state.selected_job}
                  refresh={this.state.refresh}
                />
              ):[]}
              <Project
                id={this.state.selected_project}
                project_data={this.state.projects_by_id[this.state.selected_project]}
                onSelectProject={(id, job)=>{
                  this.selectProject(id, job);
                }}
                selected_job={this.state.selected_job}
                refresh={this.state.refresh}
              />
            </div>
            <JobDetails
              selected_job={this.state.selected_job}
              handleJobClick={this.handleJobClick}
              updateJob={this.updateJob}
            />
          </div>
        ) : (
          <div className={"project-list"+(this.state.selected_job?"":" show")}>
            {projects}
          </div>
        )}
      </div>
    );
  }
}

export default Projects
