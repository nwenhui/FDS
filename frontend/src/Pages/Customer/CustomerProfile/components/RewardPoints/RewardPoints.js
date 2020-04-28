import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Avatar,
} from "@material-ui/core";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.error.dark,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
}));

const RewardPoints = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const rewardPoints = 53;
  const points = props.points;

  /**** Fetch the reward points for the customer

  const url = 'api/v1/...';
  let rewardPoints = 0;

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    rewardPoints = result;
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

  ****/

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      {/* <CardHeader title="Reward Points" /> */}
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              REWARD POINTS
            </Typography>
            <Typography variant="h3">{points}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <CardGiftcardIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

RewardPoints.propTypes = {
  className: PropTypes.string,
};

export default RewardPoints;
