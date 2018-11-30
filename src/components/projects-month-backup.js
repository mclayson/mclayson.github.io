import React from 'react'

class Projects extends React.Component {
  state = {
    loaded: false
  };
  month_names = [
    "",
    "January",
    "Fabruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  data = [
    {
      start_date: new Date(2018,10,20),
      name: "Job",
      icon: "fas fa-hammer",
      progress: 100
    },
    {
      start_date: new Date(2018,10,22),
      name: "Job",
      icon: "fas fa-hammer",
      progress: 100
    },
    {
      start_date: new Date(2018,10,12),
      name: "Job",
      icon: "fas fa-hammer",
      progress: 100
    },
    {
      start_date: new Date(2018,10,29),
      name: "Job",
      icon: "fas fa-hammer",
      progress: 40
    },
    {
      start_date: new Date(2018,10,28),
      name: "Job",
      icon: "fas fa-hammer",
      progress: 78
    },
    {
      start_date: new Date(2018,10,30),
      name: "Job",
      icon: "fas fa-hammer",
      progress: 0
    },
    {
      start_date: new Date(2018,11,2),
      name: "Job",
      icon: "fas fa-hammer",
      progress: 0
    },
    {
      start_date: new Date(2018,11,4),
      name: "Job",
      icon: "fas fa-hammer",
      progress: 0
    },
    {
      start_date: null,
      name: "Job",
      icon: "fas fa-hammer",
      progress: 0
    },
    {
      start_date: null,
      name: "Job",
      icon: "fas fa-hammer",
      progress: 0
    }
  ];

  componentDidMount() {
  }

  SelectJob (e) {

  }

  render() {
    var months = {
      Unassigned: []
    };
    var display_months = [];
    this.data.map((job, i) => {
      let job_insert = {
        id:i,
        ...job
      };
      if (!job.start_date) {
        months.Unassigned.push(job_insert);
        return true;
      }
      let job_month = job.start_date.getMonth();
      if (!months[job_month]) {
        months[job_month] = [];
      }
      months[job_month].push(job_insert);
      return true;
    });
    var month_keys = Object.keys(months);
    month_keys.sort(function(a, b){return months[a] - months[b]});
    for (var i=0; i<month_keys.length; i++) {
      var month = months[month_keys[i]];
      month.sort(function(a, b){return a.start_date - b.start_date});
      var job_list = [];
      for (var j=0; j<month.length; j++) {
        var job = month[j];
        job_list.push((
          <li className={
            (job.progress === 100 ? "complete" : job.progress > 0 ? "progress" : "") +
            (job.start_date && job.start_date.getDate() === (new Date()).getDate()?" today":"")
            // eslint-disable-next-line
          } onClick={(e) => this.SelectJob(e, job.id)}>
            <span className="date">{(job.start_date ? job.start_date.getDate() : "")}</span>
            <h4><i className={job.icon}></i>{job.name}</h4>
            <span className="status">
              <span className="progress-bar" style={{transform:"scaleX("+(job.progress/100)+")"}}></span>
              <span className="status-text">{
                job.progress===100 ?
                (<i class="fas fa-check"></i>):
                job.progress===0 ?
                (""):
                (job.progress + "%")
              }</span>
            </span>
          </li>
        ));
      };
      display_months.push((
        <ul className={"timeline-month " + month_keys[i].toLowerCase()}>
          <h3>{this.month_names[month_keys[i]] || month_keys[i]}</h3>
          <span className="h-line" />
          {job_list}
        </ul>
      ));
    };

    return (
      <article className="project">
        <header>
          <h2>Project Name</h2>
        </header>
        <div className="timeline">
          {display_months}
        </div>
      </article>
    );
  }
}

// <ul className="timeline-month">
//   <h3>October</h3>
//   <span className="h-line" />
//   <li className={"complete"} onClick={(e) => this.SelectJob(e)}>
//     <span className="date">16</span>
//     <h4>job</h4>
//   </li>
//   <li className={"complete"} onClick={(e) => this.SelectJob(e)}>
//     <span className="date">18</span>
//     <h4>job</h4>
//   </li>
//   <li onClick={(e) => this.SelectJob(e)}>
//     <span className="date">20</span>
//     <h4>job</h4>
//   </li>
//   <li onClick={(e) => this.SelectJob(e)}>
//     <span className="date">23</span>
//     <h4>job</h4>
//   </li>
//   <li className="today" onClick={(e) => this.SelectJob(e)}>
//     <span className="date">28</span>
//     <h4>job</h4>
//   </li>
//   <li onClick={(e) => this.SelectJob(e)}>
//     <span className="date">30</span>
//     <h4>job</h4>
//   </li>
// </ul>
// <ul className="timeline-month">
//   <h3>November</h3>
//   <span className="h-line" />
//   <li onClick={(e) => this.SelectJob(e)}>
//     <span className="date">2</span>
//     <h4>job</h4>
//   </li>
//   <li onClick={(e) => this.SelectJob(e)}>
//     <span className="date">4</span>
//     <h4>job</h4>
//   </li>
// </ul>
// <ul className="timeline-month">
//   <h3>Unscheduled</h3>
//   <span className="h-line" />
//   <li onClick={(e) => this.SelectJob(e)}>
//     <span className="date"></span>
//     <h4>job</h4>
//   </li>
//   <li onClick={(e) => this.SelectJob(e)}>
//     <span className="date"></span>
//     <h4>job</h4>
//   </li>
// </ul>

export default Projects
