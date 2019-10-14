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
import AddressForm from './AddressForm';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import User from '../../User.js'
import { API_END_POINT } from '../../Config.js';

const cartypes = [
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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    console.log('Profile.constructor()')
    this.state = {
      fname: "",
      lname: "",
      email: "",
      address: "",
      mobile: "",
      home: "",
      work: "",
      cartype: "",
      carinfo: "",
    };
  }

  componentDidMount() {
    console.log('Profile.componentDidMount()');

    // TODO: Fetching user profile data here
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
                    fname: userProfile.FirstName,
                    lname: userProfile.LastName,
                    email: userProfile.Email,
                    address: userProfile.Address,
                    mobile: userProfile.Mobile,
                    home: userProfile.Home,
                    work: userProfile.Work,
                    cartype: userProfile.CarType,
                    carinfo: userProfile.CarInfo,
                  }
                );
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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submit = () => {
    const { classes, newSnackBar } = this.props;
    // TODO: Post user data here
    let profile = {
      FirstName: this.state.fname,
      LastName: this.state.lname,
      Address: this.state.address,
      Mobile: this.state.mobile,
      Home: this.state.home,
      Work: this.state.work,
      CarType: this.state.cartype,
      //CarInfo: this.state.carinfo,
    }

    fetch(API_END_POINT + "/profile", {
      body: JSON.stringify(profile), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, same-origin, *omit
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
                newSnackBar("Saved.");
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
    const { classes, newSnackBar } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5" align="left" className={classes.title}>
              My Profile
          </Typography>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="fname"
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    autoFocus
                    value={this.state.fname}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    autoComplete="family-name"
                    value={this.state.lname}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    value={this.state.email}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    fullWidth
                    autoComplete="mobile tel"
                    value={this.state.mobile}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="home"
                    name="home"
                    label="Home"
                    fullWidth
                    autoComplete="home tel"
                    value={this.state.home}
                    onChange={this.handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="work"
                    name="work"
                    label="Work"
                    fullWidth
                    autoComplete="work tel"
                    value={this.state.work}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="cartype"
                    name="cartype"
                    select
                    label="Car Type"
                    fullWidth
                    value={this.state.cartype}
                    onChange={this.handleChange}
                  >
                    {cartypes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Typography component="p" variant="caption" align="left" color="textSecondary" className={classes.caption}>
                * Required
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
      </React.Fragment >
    );
  }
}

export default withStyles(styles)(Profile);