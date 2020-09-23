import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select  from './select';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  //each HTML input field has onChange() event -> whenver user types something event is raised (how we get user input)
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    //setting nested object prop - > state object -> error object -> key: value (username: error message)
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value; //setting state ->  nested data obj member key:value (ex. username: 'asaa')
    this.setState({ data, errors });
  };

  //validates entire form
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options); //destructure Joi obj, pick only error property

    if (!error) return null;

    const errors = {}; //make new copy of state obj
    for (let item of error.details) errors[item.path[0]] = item.message; //pushing into state
    return errors;
  };

  //validates each input field 
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; //[computedProperties] = es6 prop passed at runtime ex. username
    const schema = { [name]: this.schema[name] }; //for each prop, will look at schema validation logic / use
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null; //returns truthy (obj) if error, or null (falsy) no error
  };

  handleSubmit = (e) => {
    e.preventDefault(); //every HTML form has an onSubmit() event, this event obj (e) has a default behavior (full page reload)-> e.preventDefault stops full page reload (making a SinglePageApp)

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options){
    const { data, errors } = this.state; 

    return(
        <Select 
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
        />
    )
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
