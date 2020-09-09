import React from "react";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    selectedItem,
    onItemSelect, //reference to fn passed via prop -> call in onClick
  } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ?  "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

//setting default props -> if we receive a different prop name, can change
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
