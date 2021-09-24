import React from "react";

class SearchWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onInput = this.onInput.bind(this);
  }
  onChange(e) {
    var value = e.target.value;
    this.setState({
      name: value,
    });
  }
  onInput() {
    this.props.onSearch(this.state);
  }
  render() {
    return (
      <div className="input-group mb-5">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa..."
          onChange={this.onChange}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onInput}
          >
            <span className="fa fa-search mr-5"></span>Tìm
          </button>
        </span>
      </div>
    );
  }
}
export default SearchWork;
