import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef(); //creates a DOM reference

  componentDidMount() {
    this.username.current.focus(); //using Refs for autoFocus (can set attribute directly instead)
  }

  handleSubmit = (e) => {
    e.preventDefault(); //prevents full page reload (submission of form)

    //call server, redirect user to new page
    const username = this.username.current.value; //returns DOM element reference
    console.log("submit");
  };

  render() {
    return (
      <div>
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              //autoFocus
              ref={this.username}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary"> Login </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
