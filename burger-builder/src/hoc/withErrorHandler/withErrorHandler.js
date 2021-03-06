import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxilliary/Auxilliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      axios.interceptors.response.use(res => res, error => {
        this.setState({ erroe: error });
      });
    }

    errorConfirmedHandler = () => {
        this.setState({error: null})
    }

    render() {
      return (
        // JSX
        <Aux>
          <Modal show ={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
