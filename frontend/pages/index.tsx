import * as React from 'react';
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
  const {levels, onChange} = props;
  const ret = []

  for (const l in levels) {
    ret.push(LevelListItem({'level': levels[l], 'onChange': onChange}))
  }

  return (
    <List>
      {ret}
    </List>
  )
}

export default function Home() {
  const[loginDrawer, changeLoginDrawer] = React.useState(false);
  const[levelDrawer, changeLevelDrawer] = React.useState(false);
  const[option, changeOption] = React.useState('');
  const[level, changeLevel] = React.useState('');

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
              <LevelList levels={{"Test": "Hello"}} onChange={levelChange} />
            </Box>
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dungeon Creator
          </Typography>
          <Button color="inherit">
            Login
          </Button>
          <Drawer anchor={'right'} open={loginDrawer} onClose={() => changeLoginDrawer(!loginDrawer)} >
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
