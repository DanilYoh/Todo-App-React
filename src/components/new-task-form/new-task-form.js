import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      minutesValue: '',
      secondsValue: '',
    };

    this.handleInputChange = (event) => {
      this.setState({
        inputValue: event.target.value,
      });
    };

    this.handleInputMinutes = (event) => {
      this.setState({
        minutesValue: event.target.value,
      });
    };

    this.handleInputSeconds = (event) => {
      this.setState({
        secondsValue: event.target.value,
      });
    };

    this.handleSubmitForm = (event) => {
      event.preventDefault();
      const { inputValue, minutesValue, secondsValue } = this.state;
      const { onCreateTask } = this.props;
      onCreateTask(inputValue, +minutesValue, +secondsValue);
      this.setState({
        inputValue: '',
        minutesValue: '',
        secondsValue: '',
      });
    };
  }

  render() {
    const { inputValue, minutesValue, secondsValue } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.handleSubmitForm}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleInputChange}
          value={inputValue}
          required
        />
        <input
          className="new-todo-form__timer"
          value={minutesValue}
          onChange={this.handleInputMinutes}
          required
          placeholder="Min"
        />
        <input
          className="new-todo-form__timer"
          value={secondsValue}
          onChange={this.handleInputSeconds}
          required
          placeholder="Sec"
        />
        <input className="new-todo-form__submit" type="submit" />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onCreateTask: () => {},
};

NewTaskForm.propTypes = {
  onCreateTask: PropTypes.func,
};
