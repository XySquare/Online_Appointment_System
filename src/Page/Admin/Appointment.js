import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { withStyles } from '@material-ui/core/styles';
import './main.scss'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { API_END_POINT } from '../../Config.js';

function createData(id, date, cartype, option, comment, user) {
  return { id, date, cartype, option, comment, user };
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

const options = [
'Wash outside only $15',

'Wash inside and outside $25',

'Deluxe wash $30 **',

];

const styles = (theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(1),
  },
  caption: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
}));

class Appointment extends React.Component {

  constructor(props) {
    super(props);
    console.log('Appointment.constructor()')
    this.state = {
      open: false,
      selectedEvent: null,
      calendarEvents: []
    }
    this.appointmentsData = null;
    this.existingAppointments = null;
  }

  componentDidMount() {
    console.log('Appointment.componentDidMount()')

      // TODO: Fetching ALL appointments data here
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
                  return createData(a.ID, a.Time, a.CarType, a.Option, a.Comment, a.User)
                })

                this.existingAppointments = [];

                for (let i in appointments) {
                  let a = appointments[i];
                  console.log(a);
                  let s = new Date(a.date);
                  let e = new Date(s.getTime() + 40 * 60000)
                  this.existingAppointments.push(
                    {
                      id: a.id,
                      start: s,
                      end: e,
                      color: e.getTime() < new Date().getTime() ? '#777777' :'#3f51b5'
                    }
                  )
          
                }
          
                this.appointmentsData = appointments;
          
                this.setState({
                  calendarEvents: this.existingAppointments,
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

  handleClose = () => {
    this.setState({
      open:false
    })
  };

  onEventClick = (e) => {
    let id = e.event.id;
    for (let i in this.appointmentsData) {
      let a = this.appointmentsData[i];
      if(a.id==id){
        console.log(a);
        this.setState({
          open: true,
          selectedEvent:a,
        })
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { open, selectedEvent } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5" align="left">
              Appointment
          </Typography>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>

                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography component="h1" variant="subtitle1" align="left">
                  </Typography>
                  <FullCalendar
                    nowIndicator={true}
                    selectable={false}
                    header={{ left: '' }}
                    slotDuration={'00:30:00'}
                    minTime={'09:00:00'}
                    maxTime={'17:00:00'}
                    allDaySlot={false}
                    defaultView="timeGridWeek"
                    plugins={[timeGridPlugin, interactionPlugin]}
                    events={this.state.calendarEvents}
                    eventClick={this.onEventClick} />
                </Grid>
                <Grid item xs={12} sm={12}>

                </Grid>

              </Grid>
            </React.Fragment>
          </Paper>
        </main>
        <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {selectedEvent ? <DialogContentText id="alert-dialog-description">
            {formatDate(selectedEvent.date)}<br/>
            {selectedEvent.cartype}<br/>
            {getOptionString(selectedEvent.option)}<br/>
            {selectedEvent.comment}<br/>
            -----------------------<br/>
            {selectedEvent.user.FirstName} {selectedEvent.user.LastName}<br/>
            {selectedEvent.user.Address}<br/>
            {selectedEvent.user.Email}<br/>
          </DialogContentText> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Appointment);