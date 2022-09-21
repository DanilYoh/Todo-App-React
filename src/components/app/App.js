import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {

  // deleteTask = (id) => {
  //   this.setState(({ taskData }) => {
  //     const idx = taskData.findIndex((e) => e.id === id);
  //     const newArr = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)];

  //     return {
  //       taskData: newArr,
  //     };
  //   });
  // };

  // onToggleDone = (id) => {
  //   this.setState(({ taskData }) => {
  //     const idx = taskData.findIndex((e) => e.id === id);
  //     const oldItem = taskData[idx];
  //     const newItem = { ...oldItem, active: !oldItem.active };
  //     const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
  //     return {
  //       taskData: newArr,
  //     };
  //   });
  // };

  // onClearCompleted = () => {
  //   this.setState(({ taskData }) => {
  //     const newArr = taskData.filter((task) => {
  //       return task.active;
  //     });
  //     return {
  //       taskData: newArr,
  //     };
  //   });
  // };

  // onEdit = (id) => {
  //   this.setState(({ taskData }) => {
  //     const idx = taskData.findIndex((e) => e.id === id);
  //     const oldItem = taskData[idx];
  //     const newItem = { ...oldItem, edit: !oldItem.edit };
  //     const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
  //     return {
  //       taskData: newArr,
  //     };
  //   });
  // };

  // handleEditTask = (id, text) => {
  //   this.setState(({ taskData }) => {
  //     const idx = taskData.findIndex((e) => e.id === id);
  //     const oldItem = taskData[idx];
  //     const newItem = { ...oldItem, label: text, edit: false };
  //     const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
  //     return {
  //       taskData: newArr,
  //     };
  //   });
  // };

  // onFilterChange = (filter) => {
  //   this.setState({ filter });
  // };

  state = {
    taskData: [
      this.createTaskItem('Сompleted task'),
      this.createTaskItem('Editing task'),
      this.createTaskItem('Active task'),
    ],
    filter: 'all',
  };

  createTaskItem(label) {
    return {
      label: label,
      id: Math.floor(Math.random() * 1000000),
      completed: false,
      active: true,
      editing: false,
    };
  }
  
  onFilterChange = (filter) => {
    this.setState({
      filter,
    });
  };

  onEdit = (id) => {
    this.toggleProperty(id, 'editing');
  };

  onToggleDone = (id) => {
    this.toggleProperty(id, 'completed');
  };

  addTask = (text) => {
    const newItem = this.createTaskItem(text);

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newItem];
      return {
        taskData: newArr,
      };
    });
  };

  handleEditTask = (id, text) => {
    this.setState(({ taskData }) => {
      const newArr = taskData.map((el, i) => {
        if (el.id === id) {
          el.label = text;
          el.editing = !taskData[i].editing;
        }
        return el;
      });
      return {
        taskData: newArr,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ taskData }) => ({
      taskData: taskData.filter((item) => item.id !== id),
    }));
  };

  toggleProperty = (id, propName) => {
    this.setState(({ taskData }) => {
      const newArr = taskData.map((el, i) => {
        if (el.id === id) {
          el[propName] = !taskData[i][propName];
        }
        return el;
      });
      return {
        taskData: newArr,
      };
    });
  };

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((el) => !el.completed);
      case 'completed':
        return items.filter((el) => el.completed);
      default:
        return items;
    }
  };

  onClearCompleted = () => {
    this.setState(({ taskData }) => ({
      taskData: taskData.filter((el) => !el.completed),
    }));
  };

  render() {
    const taskCount = this.state.taskData.filter((e) => e.completed).length;
    const { taskData, filter } = this.state;
    const visibleTasks = this.filter(taskData, filter);
    return (
      <section className="todoapp">
        <NewTaskForm onAddTask={this.addTask} />
        <section className="main">
          <TaskList
            taskData={visibleTasks}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onEdit={this.onEdit}
            handleEditTask={this.handleEditTask}
          />
          <Footer
            count={taskCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}
