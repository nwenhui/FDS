import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
} from "@material-ui/core";

class SummaryDetails extends Component {
  render() {
    return (
      <Box width={500}>
        <Card>
          <form autoComplete="off" noValidate>
            <CardHeader
              title="Monthly Summary"
              style={{ textAlign: "center" }}
            />

            <Divider />
            <CardContent>
              <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                  <Typography variant="h6" component="h2">
                    Base Salary: $400
                  </Typography>
                </Grid>

                <Grid item md={12} xs={12}>
                  <Typography variant="h6" component="h2">
                    Total Hours Worked: 75
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography variant="h6" component="h2">
                    Total Number of Journeys: 26
                  </Typography>
                </Grid>

                <Grid item md={12} xs={12}>
                  <Typography variant="h6" component="h2">
                    Total Salary Earned: $600
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
          </form>
        </Card>
      </Box>
    );
  }
}

SummaryDetails.propTypes = {
  className: PropTypes.string,
};

export default SummaryDetails;
