import React from 'react'
// import PropTypes from 'prop-types'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  state = {
  //   events: [
  //   {
  //     id: 14,
  //     title: 'Today',
  //     start: new Date(new Date().setHours(new Date().getHours() - 3)),
  //     end: new Date(new Date().setHours(new Date().getHours() + 3)),
  //   }
  // ]
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    const job = {
      start:start,
      end:end,
      title:title
    };
    if (title)

      this.props.addJob(job);

      // this.setState({
      //   events: [
      //     ...this.state.events,
      //     {
      //       start:start,
      //       end:end_date,
      //       title:title,
      //     },
      //   ],
      // })
  }

  handleSelectEvent = (event) => {
    console.log(event);
    alert(event.title + ": " + (event.end - event.start));
  }

  render() {
    // const { localizer } = this.props
    return (
      <BigCalendar
          selectable
          localizer={localizer}
          events={this.props.jobs || []}
          defaultView={BigCalendar.Views.MONTH}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={this.handleSelectEvent}
          onSelectSlot={this.handleSelect}
        />
    );
  }
}



export default Calendar
