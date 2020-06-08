import React, { Component } from "react";

import classes from "./Modal.css";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import BackDrop from "../Backdrop/Backdrop";
import PropTypes from "prop-types";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentDidUpdate() {
    console.log("[Modal.js] componentDidUpdate");
  }

  render() {
    return (
      <Aux>
        <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            tranform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            display: this.props.show ? "block" : "none"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

Modal.propTypes ={
  show: PropTypes.bool,
  clicked: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string
}

export default Modal;
