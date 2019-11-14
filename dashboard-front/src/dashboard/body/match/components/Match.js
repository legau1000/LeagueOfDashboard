import React from 'react';
import PropTypes from 'prop-types';

import {
	Typography, GridList, GridListTile, GridListTileBar
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



class Match extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		account: PropTypes.string.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			matchId: [],
			matchInfos: [],
			expanded: false,
		};
	}

	componentDidMount() {
		const url = "https://0.0.0.0:5001/lol/history/legau1000/1";

		fetch(url)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						matchId: result
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

	timeConverter = timestamp => {
		const a = new Date(timestamp * 1);
		const months = [
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
			'07',
			'08',
			'09',
			'10',
			'11',
			'12',
		];
		const year = a.getFullYear();
		const month = months[a.getMonth()];
		const date = a.getDate();
		const hours = a.getHours();
		const minutes = "0" + a.getMinutes();
		const seconds = "0" + a.getSeconds();
		const time = month + '-' + date + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
		return time;
	};

	handleExpandClick = () => {
		if (this.expanded) {
			this.setState({ expanded: false })
			this.expanded = false;
		}
		else if (!this.expanded) {
			this.setState({ expanded: true })
			this.expanded = true;
		}
		fetch(`https://0.0.0.0:5001/lol/game/${this.state.matchId.matches[0].gameId}`)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						matchInfos: result
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)

		console.log(this.state.matchInfos);
	};

	render() {
		const { error, isLoaded, expanded, matchInfos } = this.state;
		const { classes } = this.props;


		if (error) {
			return <div>Erreur : {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Chargement…</div>;
		} else {
			return (
				<div>
					<div>
						<IconButton
							className={classes.iconExpanded}
							onClick={this.handleExpandClick}
							aria-expanded={expanded}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					</div>
					<div>
						<Typography className={classes.title}>Votre dernier match</Typography>
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<div>
									
								</div>
							</CardContent>
						</Collapse>
					</div>
				</div>
			);
		}
	}
}

Match.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Match;


