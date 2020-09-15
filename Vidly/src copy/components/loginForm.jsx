import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  //validates entire form
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    console.log(error);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message; //pushing into state
    return errors;
  };

  //validates each property
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; //[computedProperties] = es6 prop passed at runtime ex. username
    const schema = { [name]: this.schema[name] }; //for each prop, will look at schema validation logic / use
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null; //returns truthy (obj) if error, or null (falsy) no error
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
          <button disabled={this.validate()} className="btn btn-primary">
            {" "}
            Login{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
