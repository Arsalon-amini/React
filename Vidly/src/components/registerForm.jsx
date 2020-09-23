import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService"; //import userService object, methods in module part of object

class RegisterForm extends Form {
  state = {
    data: { username: "", name: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data); //wrapper around http service -> wrapper around npm axios.post
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data; //server filters error obj, sends back msg. as res.data -> res.status(400).send(error.details[0].message);
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1> Register </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
