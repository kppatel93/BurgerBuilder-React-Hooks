import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/"> Burger Builder </NavigationItem>
        { props.isAuthenticated ? <NavigationItem link="/orders"> My Orders </NavigationItem> : null }
        { !props.isAuthenticated 
            ? <NavigationItem link="/auth"> Login/Signup </NavigationItem> 
            : <NavigationItem link="/logout"> Logout </NavigationItem> 
        }
    </ul>
);

export default navigationItems;