import React, { Component } from 'react';

class UsePoints extends Component {
    state = {  }
    render() { 
        return (  
            <Grid item lg={6} sm={6} xl={6} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Use 10 points for free delivery?</FormLabel>
              <Switch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            </FormControl>
          </Grid>
        );
    }
}
 
export default UsePoints;