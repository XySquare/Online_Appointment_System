import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Dashboard_Profile from './Dashboard_Profile';
import Dashboard_Appointment from './Dashboard_Appointment';
import Profile from './Profile.js'
import Appointment from './Appointment.js'
import { BrowserRouter as Router, Route, Link as RouteLink, Switch } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import { API_END_POINT } from '../../Config.js';
import Link from '@material-ui/core/Link';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
      Gabriel and David
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const styles = (theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    //padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      //padding: theme.spacing(3),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log('Dashboard.constructor()')
    this.state = {
      open: true,
      snackBarOpen: false,
      snackBarMsg: "",
      userProfile: {
        name: "-",
        email: "-",
        address: "-",
        mobile: "-",
        home: "-",
        work: "-",
        cartype: "-",
      },
      appointments: [],
    };
  }

  handleDrawerOpen = () => {
    this.setState({
      open: true,
    })
  };
  handleDrawerClose = () => {
    this.setState({
      open: false,
    })
  };
  handleSnackBarOpen = (msg) => {
    this.setState({
      snackBarOpen: true,
      snackBarMsg: msg,
    })
  };
  handleSnackBarClose = (event, reason) => {
    console.log(reason)
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      snackBarOpen: false,
    })
  };

  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  render() {
    const { classes, match } = this.props;
    const { open, snackBarOpen, snackBarMsg, userProfile, appointments } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
          </Typography>
            <IconButton color="inherit" component={RouteLink} to="/">
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Route path={`${match.url}/dashboard`} render=
            {() =>
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  {/* User Profile
                    <Grid item sm={12} lg={6}>
                      <Card>
                        <Dashboard_Profile userProfile={userProfile} />
                      </Card>
                    </Grid> */}
                  {/* Ad 
                    <Hidden mdDown>
                      <Grid item lg={6}>
                        <Card>
                          <CardMedia
                            component="img"
                            className={classes.media}
                            image={ad}
                            title=""
                            height="260"
                          />
                        </Card>
                      </Grid>
                    </Hidden>*/}
                  {/* Recent Appointment */}
                  <Grid item xs={12}>
                    <Card>
                      <Dashboard_Appointment rows={appointments} openDialog={this.handleDialogOpen} newSnackBar={this.handleSnackBarOpen}/>
                    </Card>
                  </Grid>
                </Grid>
              </Container>

            } />

          <Route path={`${match.url}/profile`} render={() => <Profile newSnackBar={this.handleSnackBarOpen} />} />
          <Route path={`${match.url}/appointment/:id?`} render={(props) => <Appointment newSnackBar={this.handleSnackBarOpen} {...props} />} />
          <Copyright />
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            key={0}
            open={snackBarOpen}
            autoHideDuration={3000}
            onClose={this.handleSnackBarClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{snackBarMsg}</span>}
          />
        </main>

      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
