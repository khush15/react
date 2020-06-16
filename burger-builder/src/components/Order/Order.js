import React from "react";

import classes from "./Order.css";

const order = props => {
  // ingredients obj to array
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      amount: props.ingredients[ingredientName],
      name: ingredientName
    });
  }
console.log(ingredients);

  const ingredeintOutput = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          padding: '5px',
          border: '1px solid #ccc'
        }}
        key={ig.key}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredeintOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
