import React from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

const TaskFilter = ({ fiIter, onToggleFilter }) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        name="all"
        className={fiIter === 'all' ? 'selected' : ''}
        onClick={(event) => onToggleFilter(event.target.name)}
      >
        All
      </button>
    </li>
    <li>
      <button
        type="button"
        name="active"
        className={fiIter === 'active' ? 'selected' : ''}
        onClick={(event) => onToggleFilter(event.target.name)}
      >
        Active
      </button>
    </li>
    <li>
      <button
        type="button"
        name="completed"
        className={fiIter === 'completed' ? 'selected' : ''}
        onClick={(event) => onToggleFilter(event.target.name)}
      >
        Completed
      </button>
    </li>
  </ul>
);

TaskFilter.defaultProps = {
  fiIter: 'all',
  onToggleFilter: () => {},
};

TaskFilter.propTypes = {
  fiIter: PropTypes.string,
  onToggleFilter: PropTypes.func,
};

export default TaskFilter;
