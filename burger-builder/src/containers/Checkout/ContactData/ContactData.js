import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import { BUTTON } from "../../../constants/constant";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'please enter a valid name'
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'please enter a valid street'
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "zipcode"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        errorMessage: 'please enter a valid zipcode'
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'please enter a valid country'
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'please enter a valid email'
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "Fastest", displayValue: "Fastest" },
            { value: "Cheapest", displayValue: "Cheapest" }
          ]
        },
        validation: {},
        value: "",
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();  // because we do not want to send req automatically that would reload my page
    // console.log(this.props.ingredients);

    this.setState({ loading: true });

    const formData = {};
    for(let formElementIdentifier in this.state.orderForm){
      // set formdata for a given formElementIdentifier
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    axios
      .post("/orders.json", order)
      .then(res => {
        // console.log(res);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        // console.log(error);
        this.setState({ loading: false });
      });
  };

  checkValidity(value,rules){
    let isValid = true;
if(!rules) {
  return true;
}
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
isValid = value.length >= rules.minLength  && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength  && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier ) => {
    // console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElelemnt = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElelemnt.value = event.target.value;
    updatedFormElelemnt.valid = this.checkValidity(updatedFormElelemnt.value, updatedFormElelemnt.validation);
    updatedFormElelemnt.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElelemnt;
    console.log('updatedFormElelemnt>>',updatedFormElelemnt);
    let formIsValid =true;
    for(let inputIdentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }
        

  render() {

    const formElementsArray = [];
    for(let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement =>(
          <Input 
          key={formElement.id} 
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig} 
          value={formElement.config.value} 
          inValid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          errorMessage={formElement.config.errorMessage}
          changed={(event) => this.inputChangedHandler(event,formElement.id)} />
        ))}
        
        <Button btnType={BUTTON.SUCCESS} disabled={!this.state.formIsValid}>
          SUBMIT
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
