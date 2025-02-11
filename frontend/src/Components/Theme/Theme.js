import React from 'react'
import './Theme.css'

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Theme = ({setMode}) => {


    const handleToggle = (event) => {
        setMode(event.target.checked ? 'dark' : 'light');
      };
      
  return (
    <div>
        <FormGroup>
      <FormControlLabel control={<Switch onChange={handleToggle}/>} />
      
    </FormGroup>
    </div>
  )
}

export default Theme