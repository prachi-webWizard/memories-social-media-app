import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import memoriesLogo from "../../../src/images/memoriesLogo.png";
import memoriesText from "../../../src/images/memoriesText.png";
import useStyles from './styles';
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: LOGOUT });
        history.push("/auth");
        setUser(null);
    }
    
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height='45px'/>
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ): (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;