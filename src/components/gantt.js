import React from 'react'
// import PropTypes from 'prop-types'
import ReactGantt from 'gantt-for-react';

class Gantt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewMode: 'Day',
      jobs: this.getJobs(),
    };
  }

  componentDidMount() {
    // window.setInterval(function() {
      this.setState({
        viewMode: "Quarter Day",//['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'][parseInt(Math.random() * 5 + 1,10) - 1],
        //jobs: this.getJobs()//.slice(0, parseInt(Math.random() * 4 + 1,10))
      });
    // }.bind(this), 5000)
  };

  getJobs = () => {
    // let names = [
    //   ["Redesign website", [0, 7]],
    //   ["Write new content", [1, 4]],
    //   ["Apply new styles", [3, 6]],
    //   ["Review", [7, 7]],
    //   ["Deploy", [8, 9]],
    //   ["Go Live!", [10, 10]]
    // ];

    let jobs = this.props.jobs.map(function(job, i) {
      // let today = new Date();
      // let start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      // let end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      // start.setDate(today.getDate() + name[1][0]);
      // end.setDate(today.getDate() + name[1][1]);
      return {
        start: new Date(job.start),
        end: new Date(job.end),
        name: job.title,
        id: "Job " + i,
        progress: parseInt(Math.random() * 100, 10)
      }
    });
    // jobs[1].dependencies = "Job 0";
    // jobs[2].dependencies = "Job 1, Job 0";
    // jobs[3].dependencies = "Job 2";
    // jobs[5].dependencies = "Job 4";
    //
    // jobs[0].custom_class = "bar-milestone";
    // jobs[0].progress = 60;
    return jobs;
  };

  customPopupHtml = job => {
    console.log(job);
    const end_date = "";//job._end.format('MMM D');
    return `
      <div class="details-container">
        <h5>${job.name}</h5>
        <p>Expected to finish by ${end_date}</p>
        <p>${job.progress}% completed!</p>
      </div>
    `;
  };

  render() {
    return (
      <div className='examples'>
        <div className='parent'>
          <label> render ReactGantt Component </label>
          <div style={{overflow: 'scroll'}}>
            { this.props.jobs.length>0 &&
              <ReactGantt jobs={this.getJobs()}
                          viewMode={this.state.viewMode}
                          customPopupHtml={this.customPopupHtml}
                          scrollOffsets={this.state.scrollOffsets}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}



export default Gantt
