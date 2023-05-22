import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => {
        history.push("/")
        dispatch({ type: 'LOGOUT' })
      }}
    >
      <Icon path={mdiLogout} size={1} color="#f2f2f2" />
    </Button>
  );
}

export default LogOutButton;
