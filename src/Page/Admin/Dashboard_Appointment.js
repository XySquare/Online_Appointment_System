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
function createData(id, date, cartype, option, comment, address) {
  return { id, date, cartype, option, comment, address };
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
      appointments: [],
    }
    this.existingAppointments = null;
  }


  componentDidMount() {
    console.log('Dashboard_Appointment.componentDidMount()');

    // TODO: Fetching user appointments here
    fetch(API_END_POINT + "/all", {
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
                  return createData(a.ID, formatDate(a.Time), a.CarType, getOptionString(a.Option), a.Comment, a.User.Address)
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
    const { appointments } = this.state;

    return (
      <React.Fragment>
        <CardContent>
          <Title>Appointments</Title>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Car Type</TableCell>
                <TableCell>Option / Price</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.cartype}</TableCell>
                  <TableCell>{row.option}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardActions>
          <Button component={Link} to="./appointment" color="primary">
            More...
      </Button>
          {/*<Button>
        History
      </Button>*/}
        </CardActions>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard_Appointment);