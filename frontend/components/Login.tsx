import * as React from 'react';
import axios from 'axios';
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// The instance to connect to the backend
const instance = axios.create({
    baseURL: 'http://localhost:3000'
  })

// Component used to login
function Login (props: any) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginState, setLoginState] = React.useState('Please log in');
  
    const {drawerState, setDrawerState, setView, setUser} = props;
  
    // Handles the changing of the username
    const changeUsername = (event: any) => {
      setUsername(event.target.value);
    }
  
    // Handles the changing of the password. Passwords are never stored in plaintext
    const changePassword = (event: any) => {
      setPassword(Base64.stringify(sha256(event.target.value)));
    }
  
    // Handles the actual logon
    const logon = async () => {
      // Gets the user's data
      const response = await instance.get(`/user/${username}`);
      const body = response.data;
      // Checks to make sure the password matches
      if (password == body['password']) {
        // Sets the session up
        sessionStorage.setItem('dungeon_username', username);
        // Sets up the admin's session
        if (body['isadmin'] == true) {
          sessionStorage.setItem('dungeon_admin', username);
        }
        setDrawerState(!drawerState);
        setUser(username);
      }
      else {
        setLoginState('Invalid Username or Password');
      }
    }
    
    return (
        <Box>
          <h6>{loginState}</h6>
          <TextField label="username" type='text' onChange={changeUsername} />
          <TextField label="password" type='password' onChange={changePassword} />
          <Button onClick={logon}>Login</Button>
          <Button onClick={() => setView(true)}>Create Account</Button>
        </Box>
      )
}

// Handles NewUser events
function NewUser (props: any) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loginState, setLoginState] = React.useState('Please log in');
  
    const {drawerState, setDrawerState, setView, setUser} = props;
  
    // Handles the username input
    const changeUsername = (event: any) => {
      setUsername(event.target.value);
    }
  
    // Handles the password input
    const changePassword = (event: any) => {
      setPassword(Base64.stringify(sha256(event.target.value)));
    }

    // Handles the password confirmation input
    const changeConfirmPassword = (event: any) => {
        setConfirmPassword(Base64.stringify(sha256(event.target.value)));
    }
  
    // Handles loggin on
    const logon = async () => {
      const response = await instance.get(`/user/${username}`);
      const body = response.data;
      // Makes sure that the passwords match
      if (password != confirmPassword) {
        setLoginState("Passwords do not match!");
      }
      // Makes sure that no one else with the same username exists
      else if (!body) {
        await instance.post('/users', {
            'userid': username,
            'password': password
        })
        // Creates the session
        sessionStorage.setItem('dungeon_username', username);
        console.log(sessionStorage.getItem('dungeon_username'));
        setDrawerState(!drawerState);
        setUser(username);
      }
      else {
        setLoginState('Username already taken');
      }
    }

    return (
        <Box>
          <h6>{loginState}</h6>
          <TextField label="username" type='text' onChange={changeUsername} />
          <TextField label="password" type='password' onChange={changePassword} />
          <TextField label="confirm password" type='password' onChange={changeConfirmPassword} />
          <Button onClick={logon}>Create User</Button>
          <Button onClick={() => setView(false)}>Log in</Button>
        </Box>
      )
}

// Handles switching between Login and Creating a new User
export default function Loginout (props: any) {
    const [newUser, setNewUser] = React.useState(false);
    const {drawerState, setDrawerState, setUser} = props;

    if (newUser) {
        return (
            <NewUser drawerState={drawerState} setDrawerState={setDrawerState} setView={setNewUser} setUser={setUser} />
        )
    }
    else {
        return (
            <Login drawerState={drawerState} setDrawerState={setDrawerState} setView={setNewUser} setUser={setUser}/>
        )
    }
}