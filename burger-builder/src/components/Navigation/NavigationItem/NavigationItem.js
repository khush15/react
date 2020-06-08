import React from 'react';

import classes from './NavigationItem.css';
import PropTypes from "prop-types";

const navigationItem = (props) => (
    <li className={classes.NavigationItem}><a href={props.link} className={props.active ? classes.active : null}>{props.children}</a></li>
);

navigationItem.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
}

export default navigationItem;