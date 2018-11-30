import React from 'react'

const ModalWarning = (props) => (
  <section id="modal-warning">
    <header>
      <h1><i className="fas fa-exclamation-triangle"></i><span>{props.title || "Warning"}</span></h1>
      <button
        onClick={()=>{
          window.closeModal();
        }}
        className="icon-button"
      >
        <i className="fas fa-times"></i>
      </button>
    </header>
    <div className="message">{props.message}</div>
    <footer>
      <button
        onClick={()=>{
          props.handleConfirm();
          window.closeModal();
        }}
      >
        <i className="fas fa-check"></i>
        <span>{props.confirm}</span>
      </button>
      <button
        onClick={()=>{
          props.handleCancel();
          window.closeModal();
        }}
      >
        <i className="fas fa-times"></i>
        <span>{props.cancel}</span>
      </button>
    </footer>
  </section>
)

export default ModalWarning
