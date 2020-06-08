import React from "react";

import classes from "./BuildControl.css";
import PropTypes from "prop-types";

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      -
    </button>
    <button className={classes.More} onClick={props.added}>
      +
    </button>
  </div>
);

buildControl.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default buildControl;
