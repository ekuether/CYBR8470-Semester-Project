import * as React from 'react';
import axios from 'axios';
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const instance = axios.create({
    baseURL: 'http://localhost:3000'
  })

export default function Login (props: any) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loginState, setLoginState] = React.useState('Please log in');
  
    const {drawerState, setDrawerState} = props;
  
    const changeUsername = (event: any) => {
      setUsername(event.target.value);
    }
  
    const changePassword = (event: any) => {
      setPassword(Base64.stringify(sha256(event.target.value)));
    }

    const changeConfirmPassword = (event: any) => {
        setConfirmPassword(Base64.stringify(sha256(event.target.value)));
    }
  
    const logon = async () => {
      const response = await instance.get(`/user/${username}`);
      const body = response.data;
      if (password != confirmPassword) {
        setLoginState("Passwords do not match!");
      }
      else if (!body) {
        await instance.post('/users', {
            'userid': username,
            'password': password
        })
        sessionStorage.setItem('dungeon_username', username);
        setDrawerState(!drawerState);
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
          <Button>Create Account</Button>
        </Box>
      )
}