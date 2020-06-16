import React from "react";
import Burger from "../../Burger/Burger";
import Button from '../../UI/Button/Button';
import { BUTTON } from "../../../constants/constant";
import classes from './CheckoutSummary.css';

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType={BUTTON.DANGER} clicked={props.checkoutCancelled}>Cancle</Button>
      <Button btnType={BUTTON.SUCCESS} clicked={props.checkoutContinue}>Continue</Button>
    </div>
  );
};

export default checkoutSummary;
