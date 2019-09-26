import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Route, Link as RouteLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
      name: "",
			email: "",
			password: "",
		};
  }

  register(event) {
		this.props.history.replace("/client/dashboard");

    /*let credentials = {
			email: this.state.email,
			password: this.state.password
    }
    
    let credData = { "user": credentials };
    
		// Check authentication with the server
		fetch(API_END_POINT + "/login", {
			body: JSON.stringify(credData), // must match 'Content-Type' header
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, same-origin, *omit
			headers: {
				'Accept': 'application/json',
				'content-type': 'application/json'
			},
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
							if (data.user && data.user.auth_token) {
								sessionStorage.setItem("a", JSON.stringify(data.user));
								// Send them to the quiz
								this.props.history.replace("quiz");
							}
							else {
								alert("Invalid Authentication");
							}
						})
					}
					else {
						response.json().then(error => {
							alert("Unable to login\n" + error.response);
						})
					}
				}
			)
			.catch(error => {
				console.error(error);
				alert("Network error.");
      });*/
      
      event.preventDefault();
  }

  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value, // update the changed value
    });
  }

  render(){
    const { classes } = this.props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={ this.state.name }
                onChange={ this.handleChange }
              />
            </Grid>
            {/*<Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>*/}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={ this.state.email }
                onChange={ this.handleChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={ this.state.password }
                onChange={ this.handleChange }
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => this.register(e)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <RouteLink to="/" >
              <Link variant="body2">
                Already have an account? Sign in
              </Link>
              </RouteLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );}
}

export default withStyles(styles)(Register);