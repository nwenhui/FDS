import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function searchbarError() {
//   const classes = useStyles();
  var open = true;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    //LOL THIS DOESNT CLOSE ANY SHIT IDKY :^(
    open = false;
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          no restaurants found :(
        </Alert>
      </Snackbar>
    </div>
  );
}
