import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    console.log("Counters - Rendered");

    const { onReset, counters, onDelete, onIncrement, onDecrement } = this.props; //destructuring to make code cleaner, eliminating this.props.targetMember
    return (
      <div>
        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          {" "}
          Reset{" "}
        </button>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            onDelete={onDelete}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            counter={counter} //can access id and value from counter obj
          ></Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
