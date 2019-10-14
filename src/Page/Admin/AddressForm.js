import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';

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

export default function AddressForm() {
  return (
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
            id="address1"
            name="address1"
            label="Address"
            fullWidth
            autoComplete="address"
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="car"
            select
            label="Car Type"
            //value={values.currency}
            //onChange={handleChange('currency')}
            fullWidth
          >
            {cartypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
