import React from "react";

class AddWork extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddWork = this.handleAddWork.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onClear = this.onClear.bind(this);
    this.state = {};
  }
  UNSAFE_componentWillMount() {
    if (this.props.task && this.props.task.id !== null) {
      this.setState({
        id: this.props.task.id,
        txtName: this.props.task.txtName,
        txtStatus: this.props.task.txtStatus,
      });
    } else {
      this.setState({
        id: "",
        txtName: "",
        txtStatus: true,
      });
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        txtName: nextProps.task.txtName,
        txtStatus: nextProps.task.txtStatus,
      });
    }
  }
  handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    if (name === "txtStatus") value = value === "true" ? true : false;
    this.setState({
      [name]: value,
    });
  }
  handleAddWork(e) {
    e.preventDefault();
    this.props.onAddWork(this.state);
  }
  onClear() {
    this.setState({
      id: "",
      txtName: "",
      txtStatus: true,
    });
  }
  handleClose() {
    this.props.onHandleClose();
  }
  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.state.id ? "Cập Nhập Công Việc" : "Thêm Công Việc"}
            <span
              className="fal fa-times text-right"
              onClick={this.handleClose}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleAddWork}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.txtName}
                name="txtName"
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              required="required"
              value={this.state.txtStatus}
              onChange={this.handleChange}
              name="txtStatus"
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" value="submit" className="btn btn-warning">
                Thêm
              </button>
              &nbsp;
              <button
                type="reset"
                className="btn btn-danger"
                onClick={this.onClear}
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default AddWork;
