import React from 'react'
import ModalWarning from './modal-warning'
import {TasksById} from '../utilities/data'
import {Content} from '../utilities/content'

const DeleteAllTasksWarning = Content[window.loc].DeleteAllTasksWarning;
const MarkAllTasksCompleteWarning = Content[window.loc].MarkAllTasksCompleteWarning;

class TaskEditor extends React.Component {
  state = {
    tasks:[],
    add_task_text: "",
    temp_edit_text: "",
    currently_editing: 0,
    all_complete: false
  };

  componentDidMount() {
    let tasks = [];
    for (var t=0;t<this.props.selected_job_data.tasks.length; t++) {
      tasks.push({...TasksById[this.props.selected_job_data.tasks[t]]});
    }
    this.setState({
      tasks: tasks,
      all_complete: this.checkIfAllComplete(tasks)
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected_job_data && this.props.selected_job !== prevProps.selected_job) {
      let tasks = [];
      for (var t=0;t<this.props.selected_job_data.tasks.length; t++) {
        tasks.push({...TasksById[this.props.selected_job_data.tasks[t]]});
      }
      this.setState({
        tasks: tasks,
        all_complete: this.checkIfAllComplete(tasks)
      });
    }
  }

  checkIfAllComplete(tasks) {
    let progress = 0;
    let total_progress = 0;
    for (let t=0; t<tasks.length; t++) {
      if (tasks[t].completed) {
        progress++;
      }
    }
    total_progress = Math.round(100*(progress / tasks.length)) || 0;
    return total_progress === 100;
  }

  handleTaskClick = (e) => {
    let id=e.currentTarget.dataset.id;
    if (this.state.currently_editing !== id) {
      let tasks = [...this.state.tasks];
      for (var t=0; t<tasks.length; t++) {
        var task = tasks[t];
        if (task.id === id) {
          task.completed = !task.completed;
        }
      }
      this.updateTasks(tasks);
    }
  }

  handleCompleteAll = () => {
    window.openModal((
      <ModalWarning
        message={(
          <div>
            <p>
              <span>{MarkAllTasksCompleteWarning.message_1}</span>
              <strong>{this.props.selected_job_data.name}</strong>
              <span>{MarkAllTasksCompleteWarning.message_2}</span>
            </p>
            <p>{MarkAllTasksCompleteWarning.message_3}</p>
          </div>
        )}
        cancel={MarkAllTasksCompleteWarning.cancel}
        confirm={MarkAllTasksCompleteWarning.confirm}
        handleConfirm={()=>{
          let tasks = [...this.state.tasks];
          for (var t=0; t<tasks.length; t++) {
            var task = tasks[t];
            task.completed = true;
          }
          this.updateTasks(tasks);
        }}
        handleCancel={()=>{}}
      />
    ));
  }

  handleIncompleteAll = () => {
    let tasks = [...this.state.tasks];
    for (var t=0; t<tasks.length; t++) {
      var task = tasks[t];
      task.completed = false;
    }
    this.updateTasks(tasks);
  }

  handleDeleteAll = () => {
    window.openModal((
      <ModalWarning
        message={(
          <div>
            <p>
              <span>{DeleteAllTasksWarning.message_1}</span>
              <strong>{this.props.selected_job_data.name}</strong>
              <span>{DeleteAllTasksWarning.message_2}</span>
            </p>
            <p>{DeleteAllTasksWarning.message_3}</p>
            <p>{DeleteAllTasksWarning.message_4}</p>
          </div>
        )}
        cancel={DeleteAllTasksWarning.cancel}
        confirm={DeleteAllTasksWarning.confirm}
        handleConfirm={()=>{
          let tasks = [];
          this.updateTasks(tasks);
        }}
        handleCancel={()=>{}}
      />
    ));
  }

  handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let id=e.currentTarget.parentNode.parentNode.dataset.id;
    let tasks = [];
    for (var t=0; t<this.state.tasks.length; t++) {
      var task = this.state.tasks[t];
      if (task.id !== id) {
        tasks.push(this.state.tasks[t]);
      }
    }
    this.updateTasks(tasks);
  }


  handleAddKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleAddTask();
    }
  }

  handleAddChange = (e) => {
    this.setState({
      add_task_text: e.currentTarget.value
    });
  }

  handleAddTask = (e) => {
    if (this.state.add_task_text) {
      let tasks = [...this.state.tasks];
      tasks.push({
        id: Math.random()+"",
        name: this.state.add_task_text,
        completed: false
      });
      this.updateTasks(tasks);
      this.setState({
        add_task_text: ""
      });
    }
  }


  handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let id=e.currentTarget.parentNode.parentNode.dataset.id;
    let name = "";
    for (var t=0; t<this.state.tasks.length; t++) {
      const task = this.state.tasks[t];
      if (task.id === id) {
        name = this.state.tasks[t].name;
      }
    }
    this.setState({
      currently_editing: id,
      temp_edit_text: name
    });
  }

  handleEditKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleConfirmEdit(e);
    }
  }

  handleEditChange = (e) => {
    this.setState({
      temp_edit_text: e.currentTarget.value
    });
  }

  handleCancelEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      currently_editing: null
    });
  }

  handleConfirmEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let id=this.state.currently_editing;
    let tasks = [...this.state.tasks];
    for (var t=0; t<tasks.length; t++) {
      var task = tasks[t];
      if (task.id === id) {
        tasks[t].name = this.state.temp_edit_text;
      }
    }
    this.updateTasks(tasks);
    this.setState({
      currently_editing: null
    });
  }

  updateTasks (tasks) {
    // this.props.selected_job_data.tasks = tasks;
    let progress = 0;
    let total_progress = 0;
    for (let t=0; t<tasks.length; t++) {
      if (tasks[t].completed) {
        progress++;
      }
    }
    total_progress = Math.round(100*(progress / tasks.length)) || 0;

    this.props.updateJobProgress(this.props.selected_job, tasks, total_progress);
    this.setState({
      tasks: tasks,
      all_complete: total_progress === 100
    });
  }

  changeMode (mode) {
    this.setState({
      mode: mode
    });
  }

  getMenu () {
    const menu = (
      <div className="menu">
        <div>
          <div className="button-group">
            <input type="text" placeholder="task name" value={this.state.add_task_text} onChange={this.handleAddChange} onKeyPress={this.handleAddKeyPress} />
            <button onClick={(e)=>{this.handleAddTask(e)}}><i className="fas fa-plus"></i><span>add task</span></button>
          </div>
        </div>
        <div>
          {!this.state.all_complete ?(
            <button onClick={(e)=>{this.handleCompleteAll(e)}} disabled={!this.state.tasks.length}><i className="fas fa-check-circle"></i><span>mark all as complete</span></button>
          ):(
            <button onClick={(e)=>{this.handleIncompleteAll(e)}}><i className="far fa-circle"></i><span>mark all as incomplete</span></button>
          )}
          <button onClick={(e)=>{this.handleDeleteAll()}} disabled={!this.state.tasks.length}><i className="fas fa-trash"></i><span>delete all</span></button>
        </div>
      </div>
    );
    return menu;
  }

  handleTaskDragStart = (e) => {
    this.dragged_id= e.target.dataset.id;
    this.dragged_index= e.target.dataset.index;
  }

  handleTaskDragEnd = (e) => {
    window.setStyle(``);
    if (this.drop_id) {
      this.handleTaskDrop(e);
    }
  }

  handleTaskDragOver = (e) => {
    e.preventDefault();
    if (e.currentTarget.dataset.id !== this.drop_id) {
      //To fix performance issues, rather than calling render, we change a stylesheet to apply styles
      if (parseInt(e.currentTarget.dataset.index, 10) >= parseInt(this.dragged_index,10)) {
        window.setStyle(`
          [data-id="` + e.currentTarget.dataset.id + `"]:after {
            bottom: 0 !important;
            opacity: 1 !important;
          }
        `);
      } else {
        window.setStyle(`
          [data-id="` + e.currentTarget.dataset.id + `"]:after {
            top: 0 !important;
            opacity: 1 !important;
          }
        `);
      }
      this.drop_id = e.currentTarget.dataset.id;
      this.drop_index = e.currentTarget.dataset.index;
    }
  }

  handleTaskDragLeave = (e) => {
    e.preventDefault();
  }

  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  };

  handleTaskDrop = (e) => {
    e.preventDefault();
    let tasks = [...this.state.tasks];
    let old_index = this.dragged_index;
    let new_index = this.drop_index;

    this.drop_id = null;
    window.setStyle(``);

    this.array_move(tasks, parseInt(old_index,10), parseInt(new_index,10));
    this.updateTasks(tasks);
  }


  render() {
    let tasks = [...this.state.tasks];
    let task_nodes = [];

    for (var t=0; t<tasks.length; t++) {
      task_nodes.push((
        <li
          key={this.props.selected_job + "_" + tasks[t].id}
          className={
            "task" +
            (tasks[t].completed ? " completed" : "") +
            (tasks[t].id === this.state.currently_editing ? " currently-editing" : "") +
            (this.state.drop_id === tasks[t].id ? (" drop-"+this.state.drop_location) : "")
          }
          data-id={tasks[t].id}
          data-index={t}
          onClick={this.handleTaskClick}

          draggable
          onDrag={this.handleTaskDragStart}
          onDragEnd={this.handleTaskDragEnd}

          onDragOver={this.handleTaskDragOver}
          onDragLeave={this.handleTaskDragLeave}
          onDrop={this.handleTaskDrop}
        >
          <h3>
            <span className="icon-holder"><i className="fas fa-check-circle check"></i><i className="far fa-circle"></i></span>
            {this.state.currently_editing === tasks[t].id ? (
              <input className="" defaultValue={tasks[t].name} onChange={this.handleEditChange} onKeyPress={this.handleEditKeyPress} />
            ):(
              <span className="task-name">{tasks[t].name}</span>
            )}
          </h3>
          {this.state.currently_editing === tasks[t].id ? (
            <div>
              <button className="icon-button" onClick={this.handleConfirmEdit} title="Apply"><i className="fas fa-check"></i></button>
              <button className="icon-button" onClick={this.handleCancelEdit} title="Cancel"><i className="fas fa-times"></i></button>
            </div>
          ):(
            <div>
              <button className="icon-button" onClick={this.handleEdit} title="Edit Task"><i className="fas fa-edit"></i></button>
              <button className="icon-button" onClick={this.handleDelete} title="Delete Task"><i className="fas fa-trash"></i></button>
            </div>
          )}
        </li>
      ));
    }

    return (
      <div className={"task-editor" + (this.state.loaded?"":" loading")} >
        {this.getMenu()}
        <div className="task-list">
          <ul>{task_nodes}</ul>
        </div>

      </div>
    );
  }
}

export default TaskEditor
