import React, { Component } from "react";

import Aux from "../Auxilliary/Auxilliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import PropTypes from "prop-types";

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawrCloseHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawrToggleHandler = () => {
    // this is the clean way of setting the state when it depends on the old state
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  getCartSelectedItem = () => {

  }
  // cartQuant = {} 
  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClick= {this.sideDrawrToggleHandler}/>
        <SideDrawer closed={this.sideDrawrCloseHandler} open={this.state.showSideDrawer} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

Layout.propTypes ={
  drawerToggleClick: PropTypes.bool,
  closed: PropTypes.bool,
  open: PropTypes.bool,
  children: PropTypes.element,
  className: PropTypes.string
}

export default Layout;
