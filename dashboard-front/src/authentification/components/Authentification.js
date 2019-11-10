import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../dashboard/images/images.png'

import { Grid, TextField, Typography } from '@material-ui/core';

const Authentification = ({ classes }) => (
	<div className={classes.div}>
	<form  className={classes.form}>
		<Grid item xs={12} className={classes.logoWrapper}>
			<img src={logo} alt="logo" className={classes.logo} />{' '}
		</Grid>
		<Grid container className={classes.container}>
			<Grid item xs={4}>
				<Typography className={classes.labelUser}>
					UTILISATEUR{' '}
				</Typography>
			</Grid>
			<Grid item xs={8} className={classes.textFieldEmail}>
				<TextField
					id="user"
					InputProps={{
						className: classes.input,
						disableUnderline: true,
					}}
				/>
			</Grid>
			<Grid item xs={4}>
				<Typography className={classes.labelPassword}>
					MOT DE PASSE
                </Typography>
			</Grid>
			<Grid item xs={8} className={classes.textFieldPassword}>
				<TextField
					type="password"
					InputProps={{
						className: classes.input,
						disableUnderline: true,
					}}
				/>
			</Grid>
			<Grid item xs={8} />
			<Grid item xs={2}>
				<button className={classes.buttonWrapper} type="submit">
					Valider
                </button>
			</Grid>
		</Grid>
	</form>
	</div>
);

Authentification.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Authentification;