import React from 'react'

class DashJobList extends React.Component {
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
      <section id="dash-job-list">
        <h2>{"today's job list"}</h2>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
    );
  }
}

export default DashJobList
