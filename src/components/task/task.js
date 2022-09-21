import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  state = {
    label: this.props.label,
    dateCreate: new Date(),
    currentTime: '',
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.timeUpdate = setInterval(() => {
      const dateNow = this.state.dateCreate;
      const textTimeDistance = formatDistanceToNow(new Date(dateNow), { includeSeconds: true });
      this.setState({
        currentTime: textTimeDistance,
      });
    }, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.timeUpdate);
  }

  onEditChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onEditSubmit = (e) => {
    e.preventDefault();
    this.props.handleEditTask(this.props.id, this.state.label);
  };

  render() {
    let { onDeleted, completed, onToggleDone, editing, onEdit } = this.props;
    const textTime = `created ${this.state.currentTime} ago`;
    let { label } = this.state;
    let taskClassNames = '';
    if (completed) {
      taskClassNames = ' completed';
    }

    if (editing) {
      taskClassNames = 'editing';
    }

  
      return (
        <li className={taskClassNames}>
          <div className="view">
            <input type="checkbox" className="toggle" checked={taskClassNames === ' completed'} onChange={onToggleDone} />
            <label>
              <span className="description">{label}</span>
              <span className="created">{textTime}</span>
            </label>
            <button className="icon icon-edit" onClick={onEdit}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
          </div>
          {editing && (
            <form onSubmit={this.onEditSubmit}>
            <input type="text" className="edit" value={label} onChange={this.onEditChange} />
          </form>
          )}
        </li>
      );
  }
}
