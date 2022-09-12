import React from 'react';

export default class TasksFilter extends React.Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const btnClass = isActive ? 'selected' : '';
      return (
        <li key={name}>
          <button className={btnClass} mode={name} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}
