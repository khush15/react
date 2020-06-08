import React, { Component } from "react";

import Aux from "../../hoc/Auxilliary/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { INGREDIENT_PRICES } from "../../constants/constant";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../..//components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    selectedIngredients: 0,
    loading: false
  };
  
    // uncomment this for fetching Data getting CORS error so comented
    // componentDidMount() {
    //   axios
    //     .get("https://react-my-burger-f6d2b.firebaseio.com/ingredients")
    //     .then(res => {
    //       this.setState({ ingredients: res.data });
    //       console.log(res);
    //     }).catch(error => {
      // this.setState({error: true})
    // });
    // }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]; // value of the given key
      }) // now i have array of values
      .reduce((sum, el) => {
        //  used to reduce the array to a single value and executes a provided function for each value of the array (from left-to-right) and the return value of the function is stored in an accumulator.
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0, selectedIngredients: sum });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients // to distribute the properties of the old ingredients state into the new obj creting here
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
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
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    // arrow function which basically contain the state or the context of this
    this.setState({ purchasing: true });
  };

  purchaseCancleHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("You Continue");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Max",
        address: {
          street: "test street",
          zipCode: "1234",
          country: "India"
        },
        email: "khsachan@in.ibm.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(res => {
        // console.log(res);
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        // console.log(error);
        this.setState({loading: false, purchasing: false});
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients //basically copy of line no.17
    };

    // loop through all the keys in disabled info and it will simply check if this is zero or less and will update the disabled info
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // {salad: true, meat: false, ...}

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancleHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.state.totalPrice}
        selectedItems={this.state.selectedIngredients}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        {/* Modal */}
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancleHandler}
        >
          {orderSummary}
        </Modal>

        {/* Burger */}
        <Burger ingredients={this.state.ingredients} />

        {/* Burger Controls */}
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchaseable}
          ordered={this.purchaseHandler}
          selectedIngredients={this.state.selectedIngredients}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
