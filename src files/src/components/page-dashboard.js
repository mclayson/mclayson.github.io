import React from 'react'
import DashJobList from './dash-job-list'
import DashLeadsList from './dash-leads-list'

class PageDashboard extends React.Component {
  state = {
    loaded: false
  };
  componentDidMount() {
    setTimeout(()=>{
      this.setState({loaded: true});
    }, 50);
  }
  render() {
    return (
      <section id="page-dashboard">
        <div className={this.state.loaded?"loaded":"unloaded"}>
          <div className="card d1">
            <DashJobList />
          </div>
          <div className="card d2">
            <DashLeadsList />
          </div>
        </div>
        <div className={this.state.loaded?"loaded":"unloaded"}>
          <div className="card d3">
            <h2>project progress</h2>
          </div>
        </div>
      </section>
    );
  }
}

export default PageDashboard
