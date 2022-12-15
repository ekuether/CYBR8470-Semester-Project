import * as React from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Menu from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import NewUser from '../components/NewUser'
import Loginout from '../components/Login'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

// Function that returns the logon form
//
// function Login (props: any) {
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [loginState, setLoginState] = React.useState('Please log in');

//   const {drawerState, setDrawerState} = props;

//   const changeUsername = (event: any) => {
//     setUsername(event.target.value);
//   }

//   const changePassword = (event: any) => {
//     setPassword(Base64.stringify(sha256(event.target.value)));
//   }

//   const logon = async () => {
//     const response = await instance.get(`/user/${username}`);
//     const body = response.data;
//     if (password == body['password']) {
//       sessionStorage.setItem('dungeon_username', username);
//       setDrawerState(!drawerState);
//     }
//     else {
//       setLoginState('Invalid Username or Password');
//     }
//   }

//   return (
//     <Box>
//       <h6>{loginState}</h6>
//       <TextField label="username" type='text' onChange={changeUsername} />
//       <TextField label="password" type='password' onChange={changePassword} />
//       <Button onClick={logon}>Login</Button>
//       <Button>Create Account</Button>
//     </Box>
//   )
// }


function LevelListItem (props: any) {
  const {level, onChange} = props
  return (
    <ListItem>
      <ListItemButton onClick={() => onChange(level)}>
        <ListItemText primary={level} />
      </ListItemButton>
    </ListItem>
  );
}

function LevelList (props: any) {
  const[levelDialog, changeLevelDialog] = React.useState(false);
  const {levels, onChange} = props;
  const ret: any = [];

  for (const i in levels) {
    ret.push(LevelListItem({'level': levels[i], 'onChange': onChange}));
  }

  return (
    <Box>
      <List>
        {ret}
        <ListItem>
          <ListItemButton onClick={() => changeLevelDialog(!levelDialog)}>
            <ListItemText primary="New Level"/>
          </ListItemButton>
        </ListItem>
      </List>
      <SimpleDialog onClose={changeLevelDialog} open={levelDialog}/>
    </Box>
  )
}

function SimpleDialog(props: any) {
   const [levelname, changeLevelName] = React.useState('');

    const setLevelName = (event: any) => {
      changeLevelName(event.target.value);
    }

    const submit = async () => {
      console.log(levelname);
      await instance.post('/gamelevel', {
        'levelname': levelname
      })
    }

  const { onClose, open } = props;
  return (
    <Dialog onClose={() => onClose(!open)} open={open}>
      <DialogTitle>Create New Level</DialogTitle>
      <TextField label="Level Name" type="text" onChange={setLevelName}/>
      <Button onClick={submit}>Submit</Button>
    </Dialog>
  )
}

export default function Home() {
  const[loginDrawer, changeLoginDrawer] = React.useState(false);
  const[levelDrawer, changeLevelDrawer] = React.useState(false);
  const[option, changeOption] = React.useState('');
  const[levels, changeLevels] = React.useState(['']);
  const[level, changeLevel] = React.useState('');
  const[loginButton, setLoginButton] = React.useState(<></>);

  React.useEffect(() => {
    instance.get('/gamelevel').then((response) => {
      const body = response.data;
      const ret = []
      for (const l in body) {
        ret.push(body[l]['levelname']);
      }
      changeLevels(ret);
    })
  })

  React.useEffect(() => {
    const user = sessionStorage.getItem('dungeon_username');
    if (user) {
      setLoginButton(<Button onClick={() => sessionStorage.setItem('dungeon_username', '')}>Log Out</Button>)
    }
    else {
      setLoginButton(<Button color="inherit" onClick={() => changeLoginDrawer(!loginDrawer)}>Login</Button>)
    }
  }, [loginDrawer])

  const levelChange = (levelid: any) => {
    console.log(levelid);
    changeLevel(levelid);
  }

  const handleChangeOption = (event: any) => {
    changeOption(event.target.value);
  };



  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar>
        <Toolbar>
          <IconButton color='inherit' edge='start' size='large' aria-label='levels' sx={{ mr: 2 }} onClick={() => changeLevelDrawer(!levelDrawer)}>
            <Menu/>
          </IconButton>
          <Drawer anchor={'left'} open={levelDrawer} onClose={() => changeLevelDrawer(!levelDrawer)} >
            <Box>
              <LevelList levels={levels} onChange={levelChange} />
            </Box>
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dungeon Creator
          </Typography>
          <Box>
            {loginButton}
          </Box>
          <Drawer anchor={'right'} open={loginDrawer} onClose={() => changeLoginDrawer(!loginDrawer)} >
            <Loginout drawerState={loginDrawer} setDrawerState={changeLoginDrawer} />
          </Drawer>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <Box color='grey'>
      <FormControl fullWidth variant="filled" sx={{backgroundColor: 'grey'}}>
        <InputLabel id="select">Option</InputLabel>
        <Select
          sx={{color: 'white'}}
          labelId="selct"
          id="option-select"
          value={option}
          label="Option"
          onChange={handleChangeOption}>
            <MenuItem value={"Room"}>Rooms</MenuItem>
            <MenuItem value={"Obstacle"}>Obstacles</MenuItem>
            <MenuItem value={"Item"}>Items</MenuItem>
          </Select>
      </FormControl>
      </Box>
    </Box>
  )
}
