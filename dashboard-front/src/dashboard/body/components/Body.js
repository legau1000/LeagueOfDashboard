import React from 'react';
import PropTypes from 'prop-types';

import Match from '../match';
import Tft from '../tft';
import User from '../user';
import Rotation from '../rotation';
import Masteries from '../masteries';
import Starwars from '../starwars';

import {
	Grid
} from '@material-ui/core';


const Body = ({ classes }) => (
	<Grid container>
		<Grid item xs={4}></Grid>
		<Grid item xs={4} className={classes.user}>
			<User />
		</Grid>
		<Grid item xs={4}></Grid>
		<Grid item xs={12} className={classes.match}>
			<Match />
		</Grid>
		<Grid item xs={1}></Grid>
		<Grid item xs={5} className={classes.rotation}>
			<Rotation />
		</Grid>
		<Grid item xs={5} className={classes.masteries}>
			<Masteries />
		</Grid>
		<Grid item xs={12} className={classes.tft}>
			<Tft />
		</Grid>
		<Grid item xs={12} className={classes.starwars}>
			<Starwars />
		</Grid>
	</Grid>
);

Body.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Body;