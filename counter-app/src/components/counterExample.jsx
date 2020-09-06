import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0, //state -> obj includes any data .this component needs
  };

  styles = {
    //fontSize: 50, //css propers in camelCase
    fontWeight: "bold",
  };

  render() {
    return (
      <div>
        <span style={{ fontSize: 30 }} className="badge badge-primary m-2">
          {" "}
          {this.formatCount()}{" "}
        </span>
        <button className="btn btn-secondary btn-sm">increment</button>{" "}
      </div>
    );
  }

  formatCount() {
    const { count } = this.state; //picking count property of .this obj storing in const count(destructuring)
    return count === 0 ? "Zero" : this.state.count;
  }
}

export default Counter;
