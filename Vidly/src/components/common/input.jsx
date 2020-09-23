import React from "react";

//get the ...rest of props from rest operator - onChange, type, etc. (clean code)
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger"> {error}</div>}
    </div>
  );
};

export default Input;
