import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import Trophy from "@material-ui/icons/EmojiEvents";

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
    backgroundColor: theme.palette.error.main,
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

const TopFive = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const topFive = props.data;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TOP FIVE
            </Typography>
            <Grid item>
              <Avatar className={classes.avatar}>
                <Trophy className={classes.icon} />
              </Avatar>
            </Grid>
            {topFive.map((item) => {
              return <Typography variant="h4">{item}</Typography>;
            })}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TopFive.propTypes = {
  className: PropTypes.string,
};

export default TopFive;
