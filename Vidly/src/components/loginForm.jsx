import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  //validates entire form
  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is required"; //if empty string
    if (account.password.trim() === "")
      errors.password = "Password is required"; //password required

    return Object.keys(errors).length === 0 ? null : errors; //returns an array
  };

  //validates each property
  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
      ///...other rules
    }

    if (name === "password") {
      if (value.trim() === "") return "Username is required.";
      ///...other rules
    }
  };

  handleSubmit = (e) => {
    e.preventDefault(); //prevents full page reload (submission of form)

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    //call server
    console.log("submit");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    //set name of error prop
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value; //returns input from our field dynamically, can get value
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary"> Login </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
