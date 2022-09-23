import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../task-filter';
import './footer.css';

const Footer = ({ tasks, onDeleteCompletedTasks, onToggleFilter, fiIter }) => {
  const taskCount = tasks.filter(({ isActive }) => isActive !== false).length;

  return (
    <footer className="footer">
      <span className="todo-count">{taskCount} items left</span>
      <TaskFilter fiIter={fiIter} onToggleFilter={onToggleFilter} />
      <button type="button" className="clear-completed" onClick={onDeleteCompletedTasks}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  tasks: [],
  fiIter: 'all',
  onDeleteCompletedTasks: () => {},
  onToggleFilter: () => {},
};

Footer.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleteCompletedTasks: PropTypes.func,
  onToggleFilter: PropTypes.func,
  fiIter: PropTypes.string,
};

export default Footer;
