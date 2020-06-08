import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
import PropTypes from 'prop-types';

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
  
  {props.selectedIngredients == 0 ? <p>Please select Ingredients to Continue</p> : <p>Total Selected ingredients: <strong>{props.selectedIngredients}</strong></p>}
  <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
    ))}

    <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
  </div>
);

buildControls.propTypes = {
  key: PropTypes.string,
  label: PropTypes.string,
  added: PropTypes.func,
  removed: PropTypes.func,
  disabled: PropTypes.object
}

export default buildControls;
