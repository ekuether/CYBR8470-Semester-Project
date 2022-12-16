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
import Loginout from '../components/Login'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

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
  const {levels, setLevels, onChange, user} = props;
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
      <SimpleDialog onClose={changeLevelDialog} setLevels={setLevels} levels={levels} open={levelDialog} user={user}/>
    </Box>
  )
}

function SimpleDialog(props: any) {
   const [levelname, changeLevelName] = React.useState('');
   const { onClose, open, user, setLevels, levels } = props;
   const ret = levels;

    const setLevelName = (event: any) => {
      changeLevelName(event.target.value);
    }

    const submit = async () => {
      console.log(levelname);
      const response = await instance.post('/gamelevel', {
        'levelname': levelname
      })
      const id = response.data['id'];
      console.log(id);
      await instance.post(`/user/${user}/levels`,{
        'level': id
      })
      ret.push(levelname);
      setLevels(levels);
    }

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
  const[user, setUser] = React.useState('');
  
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

  React.useEffect(() => {
    console.log(user);
    if (!user) {
      changeLevels([]);
      return;
    }
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
              <LevelList levels={levels} setLevels={changeLevels} onChange={levelChange} user={user}/>
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
      </Box>
    </Box>
  )
}
