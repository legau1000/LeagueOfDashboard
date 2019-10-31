import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,  Button,
 } from '@material-ui/core';


const Dashboard = ({ classes }) => (
  <Grid container>
    <Grid item xs={9} className={classes.profileWrapper}>
      <div>
            <Button color="primary">
              Annuler
            </Button>
      </div>
    </Grid>
  </Grid>
);

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Dashboard;
