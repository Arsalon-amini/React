import React, { Component } from "react";

class Counter extends Component {
  state = {
    value: this.props.counter.value, //state -> obj includes any data .this component needs //props - JS object includes attributes of component
  };
  $;

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}> {this.formatCount()} </span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          increment
        </button>{" "}
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  handleIncrement = (product) => {
    console.log(product);
    this.setState({ value: this.state.value + 1 }); //.setState allows us to update state in component
  };

  formatCount() {
    const { value: count } = this.state; //picking count property of .this obj storing in const count(destructuring)
    return count === 0 ? "Zero" : this.state.value;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }
}

export default Counter;
