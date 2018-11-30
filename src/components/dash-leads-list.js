import React from 'react'

class DashLeadsList extends React.Component {
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
      <section id="dash-leads-list">
        <h2>leads</h2>
        <h3>need to be contacted</h3>
        <ul>
          <li>
            <span>Luke Skywalker </span>
            <span>{"luke.skywaler@starwars.com"}</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>Luke Skywalker </span>
            <span>{"luke.skywaler@starwars.com"}</span>
          </li>
        </ul>
      </section>
    );
  }
}

export default DashLeadsList
