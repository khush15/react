import React from "react";

import classes from './Logo.css';
import burgerLogo from "../../assets/images/logo.png"; 
//source folder is the only folder we are working in. In the end, webpack will take all these files, bundle them together and create a new output folder.
//  we should make webpack aware of the fact that we are  using the image and (we are actually doing that by importing image into our js file) webpack will then handle this image with aspecial plug-in or a special module that was added to webpack, to its config,

const logo = props => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="myBurger"/>
  </div>
);

export default logo;
