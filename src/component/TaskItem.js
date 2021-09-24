import React from "react";

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleDelete() {
    this.props.onHandleDelete(this.props.task.id);
  }
  handleEdit() {
    this.props.onHandleEdit(this.props.task.id);
  }
  handleChange() {
    this.props.onChangeStatus(this.props.task.id);
  }
  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.props.task.txtName}</td>
        <td className="text-center">
          <span
            className={
              this.props.task.txtStatus
                ? "label label-danger"
                : "label label-info"
            }
            onClick={this.handleChange}
          >
            {this.props.task.txtStatus ? "Kích hoạt" : "Ẩn"}
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.handleEdit}
          >
            <span className="fa fa-pencil mr-5"></span>Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.handleDelete}
          >
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default TaskItem;
