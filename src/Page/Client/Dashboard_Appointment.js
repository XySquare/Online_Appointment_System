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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { API_END_POINT } from '../../Config.js';
import { withStyles } from '@material-ui/core/styles';

// Generate Order Data
function createData(id, date, cartype, option, comment) {
  return { id, date, cartype, option, comment };
}

function getOptionString(opt){
  if(opt==1)
    return 'Wash outside only $15';
  if(opt==2)
    return 'Wash inside and outside $25';
  if(opt==3)
    return 'Deluxe wash $30';
}

function formatDate(dateJsonStr){
  let date = new Date(dateJsonStr);
  return date.toLocaleString();
}

const styles = (theme => ({
  margin: {
    marginTop: -theme.spacing(1),
    marginBottom: -theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

class Dashboard_Appointment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      appointment2BDeleted: null,
      appointments: [],
    }
    this.existingAppointments = null;
  }

  handleClickOpen = (a) => {
    this.setState({
      open: true,
      appointment2BDeleted: a,
    })
  };

  handleClose = () => {
    this.setState({
      open: false,
    })
  };

  handleDelete = (id) => {
    console.log(id);
    let d = {
      ID: id,
    }
    // TODO: Delete appointment here
    fetch(API_END_POINT + "/appointment", {
      body: JSON.stringify(d), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, same-origin, *omit
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
      .then(
        (response) => {
          if (response.ok) {
            response.json().then(data => {
              //console.log(data);
              // Authenticate the user
              if (data.message.indexOf("Success") >= 0) {
                this.props.newSnackBar("Cancel Succeed.");
                this.componentDidMount();
              }
              else {
                alert("Invalid Authentication:\n" + data.message);
              }
            })
          }
          else {
            response.json().then(error => {
              alert("Invalid Authentication:\n" + error.message);
            }).catch(error => {
              console.error(error);
              alert("Network Error.");
            });
          }
        }
      )
      .catch(error => {
        console.error(error);
        alert("Network Error.");
      });

    this.setState({
      open: false,
    })
  };

  componentDidMount() {
    console.log('Dashboard_Appointment.componentDidMount()');

    // TODO: Fetching user appointments here
    fetch(API_END_POINT + "/appointment", {
      //body: JSON.stringify(credentials), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, same-origin, *omit
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
      .then(
        (response) => {
          if (response.ok) {
            response.json().then(data => {
              //console.log(data);
              // Authenticate the user
              if (data.message.indexOf("Success") >= 0) {
                let content = data.content;

                const appointments = content.map((a) => {
                  return createData(a.ID, formatDate(a.Time), a.CarType, getOptionString(a.Option), a.Comment)
                })
                console.log(appointments);
                this.setState({
                  appointments: appointments,
                });
              }
              else {
                alert("Invalid Authentication:\n" + data.message);
              }
            })
          }
          else {
            response.json().then(error => {
              alert("Invalid Authentication:\n" + error.message);
            }).catch(error => {
              console.error(error);
              alert("Network Error.");
            });
          }
        }
      )
      .catch(error => {
        console.error(error);
        alert("Network Error.");
      });

  }

  render() {
    const { classes } = this.props;
    const { open, appointment2BDeleted, appointments } = this.state;

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
              {appointments.map(row => (
                <TableRow key={row.id}>
                  <TableCell>
                    <IconButton aria-label="Edit" className={classes.margin} component={Link} to={"./appointment/" + row.id}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete" className={classes.margin} onClick={() => this.handleClickOpen(row)}>
                      <DeleteIcon />
                    </IconButton></TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.cartype}</TableCell>
                  <TableCell>{row.option}</TableCell>
                  <TableCell>{row.comment}</TableCell>
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
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete this appointment?"}</DialogTitle>
          <DialogContent>
            {appointment2BDeleted ? <DialogContentText id="alert-dialog-description">
              {appointment2BDeleted.date}<br />
              {appointment2BDeleted.cartype}<br />
              {appointment2BDeleted.option}
            </DialogContentText> : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDelete(appointment2BDeleted.id)} color="default">
              Delete
          </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cancel
          </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard_Appointment);