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
import { API_END_POINT } from '../../Config.js';

const currencies = [
  {
    value: 'Hatchback',
    label: 'Hatchback',
  },
  {
    value: 'Sedan',
    label: 'Sedan',
  },
  {
    value: 'SUV',
    label: 'SUV',
  },
];

const options = [
  {
    value: '1',
    label: 'Wash outside only $15',
  },
  {
    value: '2',
    label: 'Wash inside and outside $25',
  },
  {
    value: '3',
    label: 'Deluxe wash $30 **',
  },
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
      cartype: "",
      time: null,
      option: "0",
      comment: "",
      calendarEvents: []
    }
    this.existingAppointments = null;
  }

  componentDidMount() {
    console.log('Appointment.componentDidMount()')
    //let id = this.props.match.params.id;
    this.existingAppointments = [];
    // TODO: Fetching ALL appointments data here
    //let range = {
    //  "From": "2000-10-02T01:20:00.000Z",
    //  "To": "2100-10-02T01:20:00.000Z"
    //}
    fetch(API_END_POINT + "/all", {
      //body: JSON.stringify(range), // must match 'Content-Type' header
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
              if (data.message.indexOf("Success") >= 0) {
                let appointments = data.content;
                for (let i in appointments) {
                  let a = appointments[i];
                  //console.log(a.ID,id);
                  //if (a.ID != id) {
                    let time = new Date(a.Time);
                    let endDate = new Date(time.getTime() + 40 * 60000);
                    this.existingAppointments.push({
                      start: time,
                      end: endDate,
                      color: '#777777'
                    });
                  //}
                }

                this.populateData(this.existingAppointments);
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

  populateData(existingAppointments) {
    let id = this.props.match.params.id;
    if (id) {
      // Edit appointment
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
                if (data.message.indexOf("Success") >= 0) {
                  let appointments = data.content;
                  let userAppointment = null;
                  let time = null;
                  for (let i in appointments) {
                    let a = appointments[i];
                    if (a.ID == id) {
                      userAppointment = a;
                      time = new Date(a.Time);
                      break;
                    }
                  }
                  for (let j in existingAppointments) {
                    let a = existingAppointments[j];
                    if (a.start.getTime() == time.getTime()) {
                      existingAppointments.splice(j, 1)
                      break;
                    }
                  }
                  let endDate = new Date(time.getTime() + 40 * 60000);
                  this.setState({
                    cartype: userAppointment.CarType,
                    time: time,
                    option: userAppointment.Option,
                    comment: userAppointment.Comment,
                    calendarEvents: [
                      ...existingAppointments,
                      {
                        start: time,
                        end: endDate,
                        color: '#3f51b5'
                      }
                    ]
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
    else {
      // Fetch user data
      fetch(API_END_POINT + "/profile", {
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
                  let userProfile = data.content;

                  this.setState(
                    {
                      cartype: userProfile.CarType,
                      calendarEvents: existingAppointments,
                    }
                  );
                }
              })
            }
          }
        )
        .catch(error => {
          console.error(error);
        });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSelectTime = event => {
    console.log(event);
    // Prevent from selecting the time before NOW
    if (event.start.getTime() < new Date().getTime())
      return false;
    //if (event.start.getMinutes() != 0)
    //  return false;
    // Prevent from selecting existing appointments
    for (let i in this.existingAppointments) {
      let a = this.existingAppointments[i];
      if (event.start.getTime() >= a.start.getTime() && event.start.getTime() <= a.end.getTime())
        return false;
    }
    // Set minute to 0
    event.start.setMinutes(0);
    let endDate = new Date(event.start.getTime() + 40 * 60000);
    //let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.setState({
      time: event.start,
      calendarEvents: [
        ...this.existingAppointments, // Existing appointments
        {
          //title: event.start.toLocaleDateString('en-au', options), 
          start: event.start,
          end: endDate,
          color: '#3f51b5'
        }
      ]
    });
    return false;
  }

  submit = () => {
    const { classes, newSnackBar } = this.props;
    let id = this.props.match.params.id;
    // TODO: Post appointment data here
    let appointment = id ? {
      ID: parseInt(id),
      CarType: this.state.cartype,
      Time: this.state.time,
      Option: parseInt(this.state.option),
      Comment: this.state.comment,
    }:{
      CarType: this.state.cartype,
      Time: this.state.time,
      Option: parseInt(this.state.option),
      Comment: this.state.comment,
    }

    fetch(API_END_POINT + "/appointment", {
      body: JSON.stringify(appointment), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, same-origin, *omit
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      method: id ? 'PUT' : 'POST', // *GET, POST, PUT, DELETE, etc.
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
                newSnackBar("Booking Succeed.");
                this.props.history.replace("/client/dashboard");
              }
              else {
                alert("Error:\n" + data.message);
              }
            })
          }
          else {
            response.json().then(error => {
              alert("Error:\n" + error.message);
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

    return (
      <React.Fragment>
        <CssBaseline />

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5" align="left" className={classes.title}>
              Appointment
          </Typography>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="cartype"
                    name="cartype"
                    select
                    required
                    label="Car Type"
                    value={this.state.cartype}
                    onChange={this.handleChange}
                    fullWidth
                  >
                    {currencies.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography component="h1" variant="subtitle1" align="left">
                    Please select a time.
          </Typography>
                  <FullCalendar
                    nowIndicator={true}
                    selectable={true}
                    header={{ left: '' }}
                    slotDuration={'00:30:00'}
                    minTime={'09:00:00'}
                    maxTime={'17:00:00'}
                    allDaySlot={false}
                    defaultView="timeGridWeek"
                    plugins={[timeGridPlugin, interactionPlugin]}
                    events={this.state.calendarEvents}
                    selectAllow={this.onSelectTime} />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="option"
                    name="option"
                    select
                    required
                    label="Pricing Option"
                    value={this.state.option}
                    onChange={this.handleChange}
                    fullWidth
                  >
                    {options.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="comment"
                    name="comment"
                    multiline
                    rows="4"
                    label="Comment"
                    value={this.state.comment}
                    onChange={this.handleChange}
                    fullWidth
                  >
                  </TextField>
                </Grid>
              </Grid>
              <Typography component="p" variant="caption" align="left" color="textSecondary" className={classes.caption}>
                * Required
                <br />
                ** Deluxe wash: washing inside and outside and the car is very dirty
          </Typography>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.submit}
                  className={classes.button}
                >
                  {'Submit'}
                </Button>
              </div>
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Appointment);