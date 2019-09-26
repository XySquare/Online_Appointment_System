/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Title from './Title';

const useStyles = makeStyles(theme => ({
  name: {
    marginBottom: theme.spacing(1),
  },
  depositContext: {
    //flex: 1,
    whiteSpace: 'nowrap',
  },
}));

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CardContent>
        <Title>My Profile</Title>
        <Typography component="p" variant="h5" className={classes.name}>
          Steven
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography color="textSecondary" variant="caption">Address</Typography>
            <Typography className={classes.depositContext}>
              161 Barry St, Carlton VIC 3053
      </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color="textSecondary" variant="caption">Car Type</Typography>
            <Typography className={classes.depositContext}>
              SUV
      </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography color="textSecondary" variant="caption">Mobile</Typography>
            <Typography className={classes.depositContext}>
              (+61) 0000000000
      </Typography>
          </Grid>
          <Grid item xs>
            <Typography color="textSecondary" variant="caption">Home</Typography>
            <Typography className={classes.depositContext}>
              (+61) 0000000000
      </Typography>
          </Grid>
          <Grid item xs>
            <Typography color="textSecondary" variant="caption">Work</Typography>
            <Typography className={classes.depositContext}>
              (+61) 0000000000
      </Typography>
          </Grid>
        </Grid>

      </CardContent>
      <CardActions>
        <Button component={ Link } to="./profile" color="primary">Edit</Button>
      </CardActions>
    </React.Fragment>
  );
}
