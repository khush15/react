import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.css';
import PropTypes from "prop-types";

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
    <NavLink
    exact={props.exact}
     to={props.link} 
     activeClassName={classes.active}>
     {props.children}
     </NavLink>
    </li>
);

navigationItem.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
}

export default navigationItem;