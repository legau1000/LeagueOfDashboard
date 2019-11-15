import React  from 'react';
import PropTypes from 'prop-types';

import {
	Typography
} from '@material-ui/core';


class User extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		pseudo: PropTypes.string.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			User: []
		};
	}

	componentDidMount() {
		const url = `https://0.0.0.0:5001/lol/account/charlieangel`;

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
		const { error, isLoaded, User } = this.state;
		const { classes, pseudo  } = this.props;

		console.log(User);

		if (error) {
			return <div>Erreur : {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Chargement…</div>;
		} else {
			return (
				<div>
					<div className={classes.div1}>
						<img className={classes.logoUser} src={User.profileIconId} alt="logoUser" />
					</div>
					<div className={classes.div1}>
						<Typography className={classes.profileName}>{User.name}</Typography>
					</div>
					<div className={classes.div2}>
						<Typography className={classes.level}>{User.summonerLevel}</Typography>
					</div>
				</div>
			);
		}
	}
}

User.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default User;
