import React from "react";
import Aux from "../../hoc/Auxilliary";
import classes from "./Layout.css";

const layout = props => (
  <Aux>
    <div>Toolbar, Sidedrawr, Backdrop</div>
    <main className={classes.content}>
       {props.children}
    </main>
  </Aux>
);

export default layout;
