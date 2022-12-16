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

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});


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
export default function LevelList (props: any) {
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
  