import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { AUTH } from '../../constants/actionTypes';
import { signin,signup } from '../../actions/auth';
import jwtDecode from 'jwt-decode';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  // const isSignup = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const decoded = jwtDecode(res.credential);
    const { name, email, sub } = decoded;
    let user = { name: name, email: email, _id: sub };
    const result = user;
    const token = res?.credential;

   try {
     dispatch({ type: AUTH, data: { result, token } });
     history.push('/');
   } catch (error) {
    console.log(error);
   }
 }

  const googleFailure = (err) => {
   console.log(err);
  console.log("Google sign in was unsuccessful. Try again later.");
 }


  return (
    <Container component={"main"} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name={"firstName"} label={"First Name"} handleChange={handleChange} autoFocus half/>
                <Input name={"lastName"} label={"Last Name"} handleChange={handleChange} half/>
              </>
            )}
            <Input name={"email"} label={"Email address"} handleChange={handleChange} type={"email"}/>
            <Input name={"password"} label={"Password"} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name={"confirmPassword"} label={"Confirm Password"} handleChange={handleChange} type={"password"}/>}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <div>
            <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            />
          </div>
          <Grid container justifyContent='flex-end'>
            <Grid item> 
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
