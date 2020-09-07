import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps); //lifecycle hook - UPDATE
    console.log("prevState", prevState);

    if (prevProps.counter.value !== this.props.counter.value) {
      //Ajax call and get new data from the Server
    }
  }
  componentWillUnmount() {
    console.log("Counter - Unmount"); //allows us to remove listeners, etc. to avoid memory leaks
  }

  render() {
    console.log("Counter - Rendered");
    const { counter, onDelete, onIncrement, onDecrement } = this.props; //destructuring to make code cleaner, eliminating this.props.targetMember
    return (
      <div className="row">
        <div className="col-1">
          <span className={this.getBadgeClasses()}> {this.formatCount()} </span>
        </div>
        <div className="col">
          <button
            onClick={() => onIncrement(counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>{" "}
          <button
            onClick={() => onDecrement(counter)}
            className="btn btn-secondary btn-sm m-2"
            disabled={counter.value == 0 ? "disabled" : ""}
          >
            -
          </button>{" "}
          <button
            onClick={() => onDelete(counter.id)}
            className="btn btn-danger btn-sm "
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  formatCount() {
    const { value } = this.props.counter; //picking count property of .this obj storing in const count(destructuring)
    return value === 0 ? "Zero" : value;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }
}

export default Counter;
