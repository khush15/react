import React, { Component } from "react";

import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Button from "../../UI/Button/Button";
import { BUTTON } from "../../../constants/constant";
import PropTypes from "prop-types";
// import userType from '../../../PropTypes';

class OrderSummary extends Component {

    // this could be functional comp, does not have to be class comp
    componentDidUpdate(){
        console.log('[OrderSummary.js] componentDidUpdate')
    }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey} - </span>
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Total Selected ingredients: <strong>{this.props.selectedItems}</strong></p>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>

        <Button clicked={this.props.purchaseCanceled} btnType={BUTTON.DANGER}>
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinue} btnType={BUTTON.SUCCESS}>
          CONTINUE
        </Button>
      </Aux>
    );
  }

  // static propTypes = {
  //   key: userType,
  //     // clicked: userType,
  //     // btnType: userType,
  //     // className: userType
  // };
}

OrderSummary.propTypes ={
    key: PropTypes.string,
    clicked: PropTypes.func,
    btnType: PropTypes.string,
    className: PropTypes.string
}



export default OrderSummary;
