import React from "react";

import classes from "./ToolBar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import PropTypes from "prop-types";

const toolBar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked= {props.drawerToggleClick} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

toolBar.propTypes ={
  clicked: PropTypes.func,
  className: PropTypes.string
}

export default toolBar;
