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
      name: "",
      email: "",
      address: "",
      mobile: "",
      home: "",
      work: "",
      cartype: "",
    };
  }

  componentDidMount() {
    console.log('Profile.componentDidMount()');
    window.setTimeout(() => {

      // TODO: Fetching user profile data here
      let userProfile = {
        name: "Steven",
        email: "sample@gmail.com",
        address: "161 Barry St, Carlton VIC 3053",
        mobile: "(+61) 0000000000",
        home: "(+61) 0000000000",
        work: "(+61) 0000000000",
        cartype: "SUV",
      }

      this.setState(
        {
          name: userProfile.name,
          email: userProfile.email,
          address: userProfile.address,
          mobile: userProfile.mobile,
          home: userProfile.home,
          work: userProfile.work,
          cartype: userProfile.cartype,
        }
      );
    }, 200);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submit = () => {
    const { classes, newSnackBar } = this.props;
    // TODO: Post user data here
    newSnackBar();
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    autoComplete="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
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
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Profile);