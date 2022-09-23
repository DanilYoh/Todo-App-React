import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task';
import './task-list.css';

const TaskList = ({ tasks, onChangeStatus, onDeleteTask, fiIter, onToggleEditInput, onEditTask }) => {
  const taskList = tasks.map((task) => (
    <Task
      {...task}
      key={task.id}
      onChangeStatus={onChangeStatus}
      onDeleteTask={onDeleteTask}
      fiIter={fiIter}
      onToggleEditInput={onToggleEditInput}
      onEditTask={onEditTask}
    />
  ));

  return <ul className="todo-list">{taskList}</ul>;
};

TaskList.defaultProps = {
  onChangeStatus: () => {},
  onDeleteTask: () => {},
  onToggleEditInput: () => {},
  onEditTask: () => {},
  fiIter: 'all',
  tasks: [],
  task: {},
};

TaskList.propTypes = {
  task: PropTypes.shape({
    text: PropTypes.string,
    id: PropTypes.number,
    isActive: PropTypes.bool,
    isEditing: PropTypes.bool,
    created: PropTypes.number,
  }),
  tasks: PropTypes.arrayOf(PropTypes.object),
  onChangeStatus: PropTypes.func,
  onDeleteTask: PropTypes.func,
  onEditTask: PropTypes.func,
  onToggleEditInput: PropTypes.func,
  fiIter: PropTypes.string,
};

export default TaskList;
