import React from 'react';
import PropTypes from 'prop-types';
import LogoRiot from '../../images/images.png'
import LogoUser from '../../images/yummi.jpg'

import Button from '@material-ui/core/Button';

import {
	Grid, Typography
} from '@material-ui/core';

const Header = ({ classes }) => (
	<Grid>
	<div className={classes.div1}>
			<img className={classes.logo} src={LogoRiot}alt="logoRiot" />
	</div>
	<div className={classes.div2}>
			<Typography className={classes.title}>RIFT</Typography>
	</div>
	<div className={classes.div3}>
		<img className={classes.logoUser} src={LogoUser} alt="logoUser" />
		<Typography className={classes.profileName}></Typography>
		<Button className={classes.button}>
					Déconnexion
      	</Button>
	</div>
	</Grid>
);

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Header;