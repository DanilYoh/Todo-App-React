import React, { Component } from 'react';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';

export default class App extends Component {
  state = {
      tasks: [
        this.createTaskItem('Completed'),
        this.createTaskItem('Editing'),
        this.createTaskItem('Active'),
      ],
      fiIter: 'all',
    };

    handleToggleStatus = (taskId) => {
      this.setState(({ tasks }) => {
        const newState = tasks.map((task) => {
          if (taskId === task.id) {
            task.isActive = !task.isActive;
          }

          return task;
        });
        return { tasks: newState };
      });
    };

    handleCreateTask = (text, minutes, seconds) => {
      const timerValue = [minutes, seconds];
      this.setState(({ tasks }) => ({
        tasks: [
          ...tasks,
          { text, id: Math.random() * 10000, isActive: true, isEditing: false, created: Date.now(), timerValue },
        ],
      }));
    };

    handleDeleteTask = (taskId) => {
      this.setState(({ tasks }) => {
        const newState = tasks.filter((task) => taskId !== task.id);

        return { tasks: newState };
      });
    };

    handleDeleteCompletedTasks = () => {
      this.setState(({ tasks }) => {
        const newState = tasks.filter((task) => (task.isActive ? task : null));

        return { tasks: newState };
      });
    };

    handleToggleEditInput = (taskId) => {
      this.setState(({ tasks }) => {
        const newState = tasks.map((task) => {
          if (taskId === task.id) {
            task.isEditing = !task.isEditing;
          }

          return task;
        });

        return { tasks: newState };
      });
    };

    handleEditTask = (text, taskId) => {
      this.setState(({ tasks }) => {
        const newState = tasks.map((task) => {
          if (taskId === task.id) {
            task.text = text;
            task.isEditing = !task.isEditing;
          }

          return task;
        });

        return { tasks: newState };
      });
    };

    handleToggleFilter = (name) => {
      this.setState({
        fiIter: name,
      });
    };
  
    createTaskItem(label) {
      return {
        id: Math.floor(Math.random() * 1000000),
        text: label,
        isActive: true,
        isEditing: false,
        created: Date.now(),
        timerValue: [0, 0],
      };
    }

  render() {
    const { tasks, fiIter } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onCreateTask={this.handleCreateTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={tasks}
            onChangeStatus={this.handleToggleStatus}
            onDeleteTask={this.handleDeleteTask}
            onEditTask={this.handleEditTask}
            fiIter={fiIter}
            onToggleEditInput={this.handleToggleEditInput}
          />
          <Footer
            tasks={tasks}
            onDeleteCompletedTasks={this.handleDeleteCompletedTasks}
            onToggleFilter={this.handleToggleFilter}
            fiIter={fiIter}
          />
        </section>
      </section>
    );
  }
}
