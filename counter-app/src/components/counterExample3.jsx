import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0, //state -> obj includes any data .this component needs
    tags: ["tag1", "tag2", "tag3"],
  };

  handleIncrement() {
    console.log("Increment Clicked");
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}> {tag}</li>
        ))}{" "}
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.state.tags.length === 0 && "Please create a new tag"}{" "}
        {/* && returns last truthy */}
        {this.renderTags()}
      </div>
    );
  }
}

export default Counter;