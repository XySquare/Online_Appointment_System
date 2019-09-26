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
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(1),
  },
}));

class Profile extends React.Component {
  constructor(props) {
		super(props);

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

  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

  submit = () => {
    const{classes, newSnackBar} = this.props;
    newSnackBar();
  }

  render(){
const{classes, newSnackBar} = this.props;
  
  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="left">
            Profile
          </Typography>
          <React.Fragment>
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
                    value={ this.state.name }
                onChange={ this.handleChange }
                margin={'normal'}
                  />
                </Grid>
                {/*<Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>*/}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="address"
                    value={ this.state.address }
                onChange={ this.handleChange }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    fullWidth
                    autoComplete="mobile"
                    value={ this.state.mobile }
                onChange={ this.handleChange }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="home" name="home" label="Home" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="work"
                    name="work"
                    label="Work"
                    fullWidth
                    value={ this.state.work }
                onChange={ this.handleChange }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="cartype"
                    name="cartype"
                    select
                    label="Car Type"
                    //value={values.currency}
                    //onChange={handleChange('currency')}
                    fullWidth
                    value={ this.state.cartype }
                onChange={ this.handleChange }
                  >
                    {cartypes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
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
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );}
}

export default withStyles(styles)(Profile);