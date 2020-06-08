import React from "react";

import classes from "./Button.css";
import PropTypes from 'prop-types';

const button = props => (
  <button
    // className={[classes.Button, classes[props.btnType]]}  // what we pass to class it has to be a string, right now its array of string
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default button;
