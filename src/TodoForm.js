import React from 'react';
import useInputState from './hooks/useInputState';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

function TodoForm(props) {
  const [value, handleChange, reset] = useInputState('');
  return (
    <Paper>
      {value}
      <TextField value={value} onChange={handleChange}></TextField>
    </Paper>
  );
}

export default TodoForm;
