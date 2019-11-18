import React  from 'react';
import PropTypes from 'prop-types';

import {
	Typography
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Shuffle from '@material-ui/icons/Shuffle';

import LogoStarWars from '../../../images/star-wars-logo-png-10.png';


class StarWars extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			character: [],
			planet: [],
		};
	}
	

	componentDidMount() {
		const url = `https://swapi.co/api/people/${Math.floor(Math.random() * (87 - 1 + 1)) + 1}`;

		fetch(url
		)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						character: result
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

	handlePlanet = homeworld => {
		fetch(homeworld)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						planet: result
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
			return this.state.planet.name
		}

		handleRandomCharacter = () => {
			const url = `https://swapi.co/api/people/${Math.floor(Math.random() * (86 - 1 + 1)) + 1}`;

			fetch(url
			)
				.then(res => res.json())
				.then(
					(result) => {
						this.setState({
							isLoaded: true,
							character: result
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
		const { error, isLoaded, character } = this.state;
		const { classes } = this.props;

		if (error) {
			return <div>Erreur : {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Chargement…</div>;
		} else {
			return (
			<div>
					<Fab color="secondary" aria-label="edit" className={classes.fab} onClick={this.handleRandomCharacter}>
						<Shuffle />
					</Fab>
					<img src={LogoStarWars} className={classes.logo} alt="champion" />
					<Typography className={classes.name}>{character.name}</Typography>
					<Typography className={classes.text}>Poids : {Math.round(character.height / 2.2046)}</Typography>
					<Typography className={classes.text}>Couleur de cheveux : {character.hair_color}</Typography>
					<Typography className={classes.text}>Couleur de peau : {character.skin_color}</Typography>
					<Typography className={classes.text}>Couleur des yeux : {character.eye_color}</Typography>
					<Typography className={classes.text}>Année de naissance : {character.birth_year}</Typography>
					<Typography className={classes.text}>Genre : {character.gender}</Typography>
					<Typography className={classes.text}>Planète : {this.handlePlanet(character.homeworld)}</Typography>
			</div>
			);
		}
	}
}

StarWars.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default StarWars;