import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {

  let tranformedIngredients = Object.keys(props.ingredients)
  .map(igKey => {
    return [...Array(props.ingredients[igKey])].map(( _, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient>;
    });
  })
  .reduce((arr, ele) => {
    return arr.concat(ele)
  }, []);

  if(tranformedIngredients.length === 0 ){
    tranformedIngredients = <p>Please Start adding Ingredients</p>
  }

  // console.log(tranformedIngredients)
  
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {tranformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
