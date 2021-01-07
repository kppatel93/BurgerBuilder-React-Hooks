import React, { useState } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

function Layout(props) {

const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

   const sideDrawerClosed = () => {
        setSideDrawerVisible(false);
    }

   const sideDrawerOpenToggle = () => {
        setSideDrawerVisible(!sideDrawerVisible);
    }
        return (
            <Auxiliary>
                <Toolbar 
                    isAuth= {props.isAuthenticated}
                    drawerToggleClicked={sideDrawerOpenToggle}/>
                <SideDrawer 
                    isAuth={props.isAuthenticated}
                    open={sideDrawerVisible} 
                    closed={sideDrawerClosed}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Auxiliary>
        );
    }


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);