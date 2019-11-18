import React from 'react';
import PropTypes from 'prop-types';
import LogoRiot from '../../images/images.png'
import AuthProvider from "../../../authentification/components/MicrosoftAuth/AuthProvider";

import {
	Grid, Typography, Button
} from '@material-ui/core';

class Header extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		onSignOut: PropTypes.func.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			User: [],
		};
	}

	componentDidMount() {
		const url = "https://0.0.0.0:5001/lol/account/" + this.pseudo;

		fetch(url
		)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						User: result
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	render() {
		const { error, isLoaded } = this.state;
		const { classes } = this.props;

		if (error) {
			return <div>Erreur : {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Chargement…</div>;
		} else {
			return (
				<Grid>
					<div className={classes.div1}>
						<img className={classes.logo} src={LogoRiot} alt="logoRiot" />
					</div>
					<div className={classes.div2}>
						<Typography className={classes.title}>RIFT</Typography>
					</div>
					<div className={classes.div4}>
						<Typography className={classes.profileName}></Typography>
						<Button className={classes.button}onClick={this.props.onSignOut}>
							Déconnexion
      					</Button>
					</div>
				</Grid>
			);
		}
	}
}



Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default AuthProvider(Header);
