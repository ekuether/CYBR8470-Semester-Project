import * as React from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Loginout from '../components/Login';
import Level from '../components/Level';
import Item from '../components/Item';
import Obstacles from '../components/Obstacles';
import Rooms from '../components/Rooms';

// Instance of the backend
const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

// Login Button Component
// Used to Witch the buttons from Login to Logout
function LoginButton (props: any) {
  const {user, changeUser, loginDrawer, changeLoginDrawer} = props;

  if (user) {
    return (
      <Button color="inherit" onClick={() => {
        sessionStorage.setItem('dungeon_username', ''); 
        sessionStorage.setItem('dungeon_admin',''); 
        changeUser("")}}>
          Log Out
        </Button>
    )
  }
  else {
    return (
      <Button color="inherit" onClick={() => changeLoginDrawer(!loginDrawer)}>Login</Button>
    )
  }
}

// Option Component
// Used to switch between the Items, Rooms, and Obstacle components
function Option (props: any) {
  const {option} = props
  if (option == 'Item') {
    return <Item/>
  }
  else if (option == 'Obstacle') {
    return <Obstacles/>
  }
  else if (option == 'Room') {
    return <Rooms/>
  }
  else {
    return (
      <>
      </>
    )
  }
}

// Main Component
export default function Home() {
  const[loginDrawer, changeLoginDrawer] = React.useState(false);
  const[levelDrawer, changeLevelDrawer] = React.useState(false);
  const[option, changeOption] = React.useState('');
  const[levels, changeLevels] = React.useState(['']);
  const[level, changeLevel] = React.useState('');
  const[user, setUser] = React.useState('');
  
  // Used to get any session stored previously
  React.useEffect(() => {
    const hold = sessionStorage.getItem('dungeon_username');
    let usernameSession: string;
    if (!hold) {
      usernameSession = '';
    }
    else {
      usernameSession = hold;
    }
    setUser(usernameSession);
    console.log(usernameSession);
  },[])

  // Used to get all the game levels associated with the username logged in
  React.useEffect(() => {
    console.log(user);
    if (!user) {
      changeLevels([]);
      return;
    }
    // If an admin is logged in gets all the levels
    if (sessionStorage.getItem('dungeon_admin')) {
      instance.get('/gamelevel').then((response) => {
        const body = response.data;
        console.log(body);
        const ret = [];
        for (const l in body) {
          ret.push(body[l]['levelname']);
        }
        changeLevels(ret);
      })
    }
    // Only gets the levels for the specific user
    else {
      instance.get(`/user/${user}/levels`).then((response) => {
        const body = response.data;
        console.log(body);
        const hold = [];
        for (const i in body) {
          console.log(body[i]);
          hold.push(body[i]['gamelevel']);
        }
        const ret: any = [];
        for (const i in hold) {
          instance.get(`/gamelevel/${hold[i]}`).then((r) => {
            ret.push(r.data['levelname']);
            console.log(r.data['levelname']);
          }) 
        }
        changeLevels(ret);
        })
      }
    },[user]);

  // Used to change the current level
  const levelChange = (levelid: any) => {
    console.log(levelid);
    changeLevel(levelid);
  }

  // Used to change the current option
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
              <Level levels={levels} setLevels={changeLevels} onChange={levelChange} user={user}/>
            </Box>
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dungeon Creator
          </Typography>
          <LoginButton loginDrawer={loginDrawer} changeLoginDrawer={changeLoginDrawer} user={user} changeUser={setUser}/>
          <Drawer anchor={'right'} open={loginDrawer} onClose={() => changeLoginDrawer(!loginDrawer)} >
            <Loginout drawerState={loginDrawer} setDrawerState={changeLoginDrawer} setUser={setUser}/>
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
      <Option option={option}/>
      </Box>
    </Box>
  )
}
