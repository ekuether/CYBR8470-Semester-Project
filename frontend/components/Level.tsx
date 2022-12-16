import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

// Instance used to connect to the backend
const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

// component to make a Listitem out of each level
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

// Dialog to open to create a new level
function SimpleDialog(props: any) {
      const [levelname, changeLevelName] = React.useState('');
      const { onClose, open, user, setLevels, levels } = props;
      const ret = levels;
  
      // Sets the level name
      const setLevelName = (event: any) => {
        changeLevelName(event.target.value);
      }
  
      // Used to handle the submission of the new level
      const submit = async () => {
        console.log(levelname);
        // Creates the new level
        const response = await instance.post('/gamelevel', {
          'levelname': levelname
        })
        // Gets the id associated with that level
        const id = response.data['id'];
        console.log(id);
        // Associates the level with the appropriate user
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

  // Main exported function
export default function LevelList (props: any) {
    const[levelDialog, changeLevelDialog] = React.useState(false);
    const {levels, setLevels, onChange, user} = props;
    const ret: any = [];
  
    // Loops through the levels and puts them in an array for the JSX to read
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
  