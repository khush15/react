import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount(){
    const query = new URLSearchParams(this.props.location.search);
    const ingredients ={};
    let price =0;
    for(let param of query.entries()) {
        // ['salad','1','bacon']
        if(param[0] === 'price'){
          price =param[1];
        } else {
          ingredients[param[0]] = +param[1]
        }
    }
    this.setState({ingredients: ingredients, totalPrice: price});
  }

  checkoutCancelledHandler = props => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = props => {
    this.props.history.replace("/checkout/contact-data"); // replace the curent wouth with
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinue={this.checkoutContinuedHandler}
        />
        <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
      </div>
    );
  }
}

export default Checkout;
