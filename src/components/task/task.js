import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/destructuring-assignment
      newText: this.props.text,
      totalTime: 0,
      // eslint-disable-next-line react/no-unused-state
      timer: null,
    };

    this.handleInputChange = (event) => {
      this.setState({
        newText: event.target.value,
      });
    };

    this.handleKeyDown = (event) => {
      const { newText } = this.state;
      const { onEditTask, id } = this.props;
      if (event.key === 'Enter' && event.target.value.trim() !== '') {
        onEditTask(newText, id);
      }

      if (event.key === 'Escape') {
        onEditTask(newText, id);
      }
    };

    this.tick = () => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.totalTime > 0) {
        this.setState(({ totalTime }) => ({
          totalTime: totalTime - 1,
        }));
      }
    };

    this.runTick = () => {
      const timer = setInterval(this.tick, 1000);
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        timer,
      });
      
    };

    this.stopTick = () => {
      const { timer } = this.state;
      clearInterval(timer);
    };
  }

  componentDidMount() {
    const { timerValue } = this.props;
    this.setState({
      totalTime: timerValue[0] * 60 + timerValue[1],
    });
  }

  componentWillUnmount() {
    this.stopTick();
  }

  render() {
    // eslint-disable-next-line prefer-const
    let { newText, totalTime } = this.state;
    const {
      text,
      isActive,
      id,
      created,
      onChangeStatus,
      onDeleteTask,
      fiIter,
      isEditing,
      onToggleEditInput,
    } = this.props;


    const min = totalTime / 60 < 10 ? `0${Math.floor(totalTime / 60)}` : Math.floor(totalTime / 60);
    const sec = totalTime % 60 < 10 ? (totalTime = `0${totalTime % 60}`) : totalTime % 60;
    const timer = `${min}:${sec}`;

    let className = isActive ? '' : 'completed';
    className += `${isEditing ? ' editing' : ''}`;
    className += `${fiIter === 'active' && !isActive ? ' hidden' : ''}`;
    className += `${fiIter === 'completed' && isActive ? ' hidden' : ''}`;

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={!isActive} onChange={() => onChangeStatus(id)} />
          <label>
            <span className="title">{text}</span>
            <span className="description">
              <button type="button" label="Run timer" className="icon icon-play" onClick={this.runTick} />
              <button type="button" label="Pause timer" className="icon icon-pause" onClick={this.stopTick} />
              <span className="timer-value">{timer}</span>
            </span>
            <span className="created">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
          </label>
          <button label="Edit task" type="button" className="icon icon-edit" onClick={() => onToggleEditInput(id)} />
          <button label="Delete task" type="button" className="icon icon-destroy" onClick={() => onDeleteTask(id)} />
        </div>
        <input
          type="text"
          className="edit"
          value={newText}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleInputChange}
        />
      </li>
    );
  }
}

Task.defaultProps = {
  text: 'Неизвестная задача',
  isActive: true,
  id: Math.random() * 10000,
  created: new Date(),
  fiIter: 'all',
  isEditing: false,
  timerValue: [],
  onChangeStatus: () => {},
  onDeleteTask: () => {},
  onEditTask: () => {},
  onToggleEditInput: () => {},
};

Task.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  id: PropTypes.number,
  created: PropTypes.number,
  isEditing: PropTypes.bool,
  onChangeStatus: PropTypes.func,
  onDeleteTask: PropTypes.func,
  onEditTask: PropTypes.func,
  fiIter: PropTypes.string,
  onToggleEditInput: PropTypes.func,
  timerValue: PropTypes.arrayOf(PropTypes.number),
};
