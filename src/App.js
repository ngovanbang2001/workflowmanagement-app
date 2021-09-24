import React from "react";

import AddWork from "./component/addWork.js";
import TaskList from "./component/TaskList";
import Sort from "./component/sort.js";
import SearchWork from "./component/searchWork.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: {},
      filter: {
        name: "",
        status: "",
      },
      search: {},
      sort: { name: "name", value: 1 },
    };
    this.handleAddWork = this.handleAddWork.bind(this);
    this.onAddWork = this.onAddWork.bind(this);
    this.onHandleClose = this.onHandleClose.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onHandleDelete = this.onHandleDelete.bind(this);
    this.onHandleEdit = this.onHandleEdit.bind(this);
    this.findIndex = this.findIndex.bind(this);
    this.onHandleFilter = this.onHandleFilter.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
  }
  UNSAFE_componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }
  findIndex(id) {
    const { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }
  createId() {
    var crypto = require("crypto");
    return crypto.randomBytes(20).toString("hex");
  }
  handleAddWork() {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
      taskEditing: null,
    });
  }

  onHandleClose() {
    this.setState({ isDisplayForm: false });
  }
  onAddWork(value) {
    const { tasks } = this.state;
    if (value.id === "") {
      const arr = {
        id: this.createId(),
        txtName: value.txtName,
        txtStatus: value.txtStatus,
      };
      tasks.push(arr);
    } else {
      const index = this.findIndex(value.id);
      if (index === -1) {
      } else {
        tasks[index] = value;
      }
    }
    this.setState({ tasks: tasks, isDisplayForm: false });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }
  onHandleDelete(key) {
    const index = this.findIndex(key);
    const arr = this.state.tasks;
    arr.splice(index, 1);
    this.setState({ tasks: arr });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }
  onHandleEdit(key) {
    const { tasks } = this.state;
    const index = this.findIndex(key);
    const taskEditing = tasks[index];
    this.setState({ taskEditing: taskEditing, isDisplayForm: true });
  }
  onChangeStatus(key) {
    const { tasks } = this.state;
    const index = this.findIndex(key);
    if (tasks[index].id === key) {
      tasks[index].txtStatus = !tasks[index].txtStatus;
      this.setState({
        tasks: tasks,
      });
    }
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }
  onHandleFilter(filterName, filterStatus) {
    filterStatus = parseInt(filterStatus, 10);
    var obj = { name: filterName, status: filterStatus };
    this.setState({ filter: obj });
  }
  onSearch(value) {
    this.setState({ search: value });
  }
  onSort(name, value) {
    this.setState({ sort: { name, value } });
  }
  render() {
    var { tasks, isDisplayForm, taskEditing, filter, search, sort } =
      this.state;

    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return (
            task.txtName.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
          );
        });
      }
      if (filter.status || filter.status === 0) {
        tasks = tasks.filter((task) => {
          if (filter.status === -1) {
            return task;
          } else {
            return task.txtStatus === (filter.status === 1 ? true : false);
          }
        });
      }
    }
    if (search) {
      if (search.name) {
        tasks = tasks.filter((task) => {
          return (
            task.txtName.toLowerCase().indexOf(search.name.toLowerCase()) !== -1
          );
        });
      }
    }
    if (sort.name === "name") {
      tasks.sort((a, b) => {
        if (a.txtName > b.txtName) return sort.value;
        else if (a.txtName < b.txtName) return -sort.value;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.txtStatus > b.txtStatus) return -sort.value;
        else if (a.txtStatus < b.txtStatus) return sort.value;
        else return 0;
      });
    }
    const checkTaskForm = isDisplayForm ? (
      <AddWork
        task={taskEditing}
        onHandleClose={this.onHandleClose}
        onAddWork={this.onAddWork}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center" onClick={this.handleData}>
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {checkTaskForm}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary mb-5"
              onClick={this.handleAddWork}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <div className="row mt-15">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <SearchWork onSearch={this.onSearch} />
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Sort onSort={this.onSort} />
              </div>
            </div>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  onHandleEdit={this.onHandleEdit}
                  onHandleDelete={this.onHandleDelete}
                  onHandleFilter={this.onHandleFilter}
                  tasks={tasks}
                  onChangeStatus={this.onChangeStatus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
