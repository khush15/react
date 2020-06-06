import React, { Component } from "react";

import Aux from "../../hoc/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { INGREDIENT_PRICES } from "../../constants/constant";

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 0.3,
//     bacon:0.7
// }

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
    },
    totalPrice: 4
  };


addIngredientHandler = ( type ) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
        ...this.state.ingredients   // to distribute the properties of the old ingredients state into the new obj creting here
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
  };

  removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      if(oldCount <= 0) {
          return;
      }
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
          ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  };

  render() {

      const disabledInfo = {
        ...this.state.ingredients //basically copy of line no.17
    };

    // loop through all the keys in disabled info and it will simply check if this is zero or less and will update the disabled info
    for ( let key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    // {salad: true, meat: false, ...}

    return (
      <Aux>
        {/* Burger */}
        <Burger ingredients={this.state.ingredients} />

        {/* Burger Controls */}
        <BuildControls disabled={disabledInfo} ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler}  />
      </Aux>
    );
  }
}

export default BurgerBuilder;
