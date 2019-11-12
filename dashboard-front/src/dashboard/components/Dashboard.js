import React from 'react';
import PropTypes from 'prop-types';

import Body from '../body';
import Header from '../header';
import ListDashboard from'../list';

import {
  Grid
 } from '@material-ui/core';


const Dashboard = ({ classes }) => (
  <Grid container>
    <Grid item xs={12} className={classes.dashboardHeader}>
      <Header />
    </Grid>
    <Grid item xs={12} className={classes.dashboardBody}>
      <Body />
    </Grid>
    </Grid>
);

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Dashboard;
