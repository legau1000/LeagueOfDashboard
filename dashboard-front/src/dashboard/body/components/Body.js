import React from 'react';
import PropTypes from 'prop-types';

import Match from '../match';
import User from '../user';
import Rotation from '../rotation';

import {
	Grid, Hidden
} from '@material-ui/core';


const Body = ({ classes }) => (
	<Grid container>
		<Grid item xs={5} className={classes.match}>
			<Match />
		</Grid>
		<Grid item xs={5} className={classes.user}>
			<User />
		</Grid>
		<Grid item xs={5} className={classes.rotation}>
			<Rotation />
		</Grid>
	</Grid>
);

Body.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Body;


/*class Body extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			Rotation: []
		};
	}

	componentDidMount() {
		console.log("oui")
		const url = "https://localhost:5001/lol/Rotation";
		
		fetch(url
		)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						Rotation: result
					});
				},
				// Remarque : il est important de traiter les erreurs ici
				// au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
				// des exceptions provenant de réels bugs du composant.
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	render() {
		const { error, isLoaded, Rotation } = this.state;
		if (error) {
			return <div>Erreur : {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Chargement…</div>;
		} else {
			return (
				<ul>
					{Rotation.map(item => (
						<li key={item.name}>
							{item.name}
						</li>
					))}
				</ul>
			);
		}
	}
}

Body.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Body;*/