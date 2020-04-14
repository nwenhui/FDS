import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
// import React, { Component } from 'react';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// class ErrorAlert extends Component {
//   state = {  
//     message: "",
//     open: true
//   }

//   handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     //LOL THIS DOESNT CLOSE ANY SHIT IDKY :^(
//     this.setState({ open: false });
//     // open = false;
//   };
  
//   render() { 
//     return (  
//       <div>
//       <Snackbar open={this.state.open} autoHideDuration={6000} onClose= {(event, reason) => this.handleClose(event, reason)}>
//         <Alert onClose={handleClose} severity="error">
//           {this.state.message}
//         </Alert>
//       </Snackbar>
//     </div>
//     );
//   }
// }
 
// export default ErrorAlert;

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

export default function ErrorAlert(message) {
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
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
