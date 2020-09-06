import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  //updating state
  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId); //create a new array without item, have react save as new state
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c; //map method returns a new array (new State obj)
    });
    this.setState({ counters }); //update state with new State obj
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter }; //clone counter obj@ [index] 
    counters[index].value++; //update state in new counter obj VS. state in old counter obj (no-no in React)
    this.setState({ counters }); //update state with new counters array (cloned / modified) 
  };

  render() {
    return (
      <div>
        <button
          onClick={this.handleReset}
          className="btn btn-primary btn-sm m-2"
        >
          {" "}
          Reset{" "}
        </button>
        {this.state.counters.map((counter) => (
          <Counter
            key={counter.id}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            counter={counter} //can access id and value from counter obj
          ></Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
