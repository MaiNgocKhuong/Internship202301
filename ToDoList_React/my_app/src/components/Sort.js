/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Sort extends Component {
  renderSort = () => {
    let { sortType, sortOrder } = this.props;
    if (sortType !== "" && sortOrder !== "") {
      return (
        <span className="label label-success label-medium text-uppercase">
          {sortType} - {sortOrder}
        </span>
      );
    }
  };
  handleClick = (sortType, sortOrder) => {
    this.props.handleSort(sortType, sortOrder);
  };
  handleSortClick = () => {
    var x = document.getElementById("dropdownMenu1");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };
  render() {
    return (
      <div className="dropdown">
        <button
          className="btn btn-default dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => {
            this.handleSortClick();
          }}
        >
          Sort by <span className="caret" />
        </button>
        <ul className="dropdown-menu" id="dropdownMenu1">
          <li onClick={() => this.handleClick("name", "asc")}>
            <a role="button" className="text-uppercase">
              Name ASC
            </a>
          </li>
          <li onClick={() => this.handleClick("name", "desc")}>
            <a role="button" className="text-uppercase">
              Name DESC
            </a>
          </li>
          <li role="separator" className="divider"></li>
          <li onClick={() => this.handleClick("level", "asc")}>
            <a role="button" className="text-uppercase">
              Level ASC
            </a>
          </li>
          <li onClick={() => this.handleClick("level", "desc")}>
            <a role="button" className="text-uppercase">
              Level DESC
            </a>
          </li>
        </ul>
        {this.renderSort()}
      </div>
    );
  }
}

export default Sort;
