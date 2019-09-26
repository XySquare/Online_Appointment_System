/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod) {
  return { id, date, name, shipTo, paymentMethod };
}

const rows = [
  createData(0, '3:00pm 16 Dec, 2019', 'SUV', '(ii) wash inside and outside / $25', 'Very loog loog loog loog loog loog special instructions')
];

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: -theme.spacing(1),
    marginBottom: -theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CardContent>
        <Title>My Appointment</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Car Type</TableCell>
              <TableCell>Option / Price</TableCell>
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                <IconButton aria-label="Edit" className={classes.margin}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin}>
                    <DeleteIcon />
                  </IconButton></TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardActions>
        <Button component={Link} to="./appointment" color="primary">
          <AddIcon />
          New Appointment
      </Button>
        {/*<Button>
        History
      </Button>*/}
      </CardActions>
    </React.Fragment>
  );
}
