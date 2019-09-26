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
    value: '0',
    label: 'Wash outside only $15',
  },
  {
    value: '1',
    label: 'Wash inside and outside $25',
  },
  {
    value: '2',
    label: 'Deluxe wash $30',
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
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
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
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(1),
  },
}));

class Appointment extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      cartype: "",
      time: null,
      option: "0",
      comment: "",
      calendarEvents: []
    }
  }

  submit = () => {
    const{classes, newSnackBar} = this.props;
    newSnackBar();
    this.props.history.replace("/client/dashboard");
  }

  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

  onSelectTime = event =>{
    console.log(event);
    if(event.start.getTime() < new Date().getTime())
      return false;
    let endDate = new Date(event.start.getTime() + 40*60000);
    //let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.setState({
      time: event.start,
      calendarEvents: [ // initial event data
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

  render(){
    const { classes } = this.props;

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
                  <TextField
                    id="cartype"
                    name="cartype"
                    select
                    required
                    label="Car Type"
                    value={ this.state.cartype }
                onChange={ this.handleChange }
                    fullWidth
                    margin={'normal'}
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
                header={{left:''}}
                slotDuration = {'00:20:00'}
                minTime = {'08:00:00'}
                maxTime = {'20:00:00'}
                allDaySlot = {false}
                defaultView="timeGridWeek" 
                plugins={[ timeGridPlugin, interactionPlugin ]} 
                events={ this.state.calendarEvents }
                selectAllow={this.onSelectTime}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="option"
                    name="option"
                    select
                    required
                    label="Pricing Option"
                    value={ this.state.option }
                onChange={ this.handleChange }
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
                    value={ this.state.comment }
                onChange={ this.handleChange }
                    fullWidth
                  >
                  </TextField>
                </Grid>
              </Grid>
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