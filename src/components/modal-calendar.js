import React from 'react'
import Calendar from './calendar'

const ModalCalendar = () => (
  <section id="modal-calendar">
    <button onClick={()=>{
      window.closeModal();
    }}>Close</button>
    <Calendar />
  </section>
)

export default ModalCalendar
