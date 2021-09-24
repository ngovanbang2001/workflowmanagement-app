import React from "react";
import TaskItem from "./TaskItem.js";
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        filterName: "",
        filterStatus: -1,
      },
    };
    this.onHandleChange = this.onHandleChange.bind(this);
  }
  onHandleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.props.onHandleFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value,
    });
  }
  render() {
    const tasks = this.props.tasks;
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={this.state.filterName}
                onChange={this.onHandleChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={this.state.filterStatus}
                onChange={this.onHandleChange}
              >
                <option value="-1">Tất Cả</option>
                <option value="0">Ẩn</option>
                <option value="1">Kích Hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
          {tasks.map((task, index) => (
            <TaskItem
              onHandleEdit={this.props.onHandleEdit}
              onHandleDelete={this.props.onHandleDelete}
              key={index}
              index={index}
              task={task}
              onChangeStatus={this.props.onChangeStatus}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
export default TaskList;
