import React from 'react'
import Scheduler from './scheduler'

class PageSchedule extends React.Component {
  render() {
    return (
      <section id="page-schedule">
        <Scheduler handleJobClick={()=>{}} />
      </section>
    );
  }
}

export default PageSchedule
