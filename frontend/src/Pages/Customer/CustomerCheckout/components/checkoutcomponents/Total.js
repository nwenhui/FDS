import React, { Component } from 'react';
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import { orderService } from "../../../../../services";

class Total extends Component {
    state = {  
        total: 0,
        delivery: 0,
    }

    componentDidMount() {
        orderService.currentTotal.subscribe((x) =>
        this.setState({
            total: x,
        })
        );
        orderService.deliveryFeeSubject.subscribe((x) => {
          this.setState({
            delivery: x
          })
        })
    }

    render() { 
        return (  
            <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Grid item>
              <Typography
                // className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Subtotal
              </Typography>
              <Typography variant="h5">${this.state.total}</Typography>
            </Grid>
            <Grid item>
              <Typography
                // className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Delivery Fee
              </Typography>
              <Typography variant="h5">${this.state.delivery}</Typography>
            </Grid>
          </Grid>
        );
    }
}
 
export default Total;