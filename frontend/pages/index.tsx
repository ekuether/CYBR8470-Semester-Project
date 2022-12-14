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


export default function Home() {
  const[loginDrawer, changeLoginDrawer] = React.useState(false);
  const[levelDrawer, changeLevelDrawer] = React.useState(false);
  const[option, changeOption] = React.useState('');

  const handleChangeOption = (event: any) => {
    changeOption(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar>
        <Toolbar>
          <IconButton color='inherit' edge='start' size='large' aria-label='levels' sx={{ mr: 2 }}>
            <Menu/>
          </IconButton>
          <Drawer anchor={'left'} open={levelDrawer} onClose={() => changeLevelDrawer(!levelDrawer)} >
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
