import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

const TaskList = ({ taskData, onDeleted, onToggleDone, onEdit, handleEditTask }) => {
  const elements = taskData.map((item) => {
    const { id, ...taskProps } = item;
    return (
      <Task
        key={id}
        id={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEdit={() => onEdit(id)}
        handleEditTask={handleEditTask}
        {...taskProps}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEdit: () => {},
  handleEditTask: () => {},
};
TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEdit: PropTypes.func,
  handleEditTask: PropTypes.func,
};

export default TaskList;
