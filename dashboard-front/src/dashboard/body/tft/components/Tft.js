import React from 'react';
import PropTypes from 'prop-types';

import {
	Typography, TableHead, CardContent, Collapse, Table, TableBody, TableCell, TableRow,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LogoTft from '../../../images/tft.png';


class Tft extends React.Component {
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
		const url = "https://0.0.0.0:5001/tft/history/legau1000";

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
		fetch(`https://0.0.0.0:5001/tft/games/${this.state.matchId.data[0]}`)
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
						<img src={LogoTft} className={classes.logo} alt="champion" />
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<div>
									<Typography className={classes.title1}>{this.timeConverter(matchInfos.info ? matchInfos.info.game_datetime : "oui")}</Typography>
									<Typography className={classes.title1}>{matchInfos.info ? matchInfos.info.game_length / 60 : "oui"} minutes</Typography>
								</div>
									<Table className={classes.table} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell className={classes.text}>Votre companion</TableCell>
											<TableCell className={classes.text} align="right">Level du joueur</TableCell>
											<TableCell className={classes.text} align="right">Dernier round</TableCell>
											<TableCell className={classes.text} align="right">Placement</TableCell>
											<TableCell className={classes.text} align="right">Or restant</TableCell>
										</TableRow>
									</TableHead>
									{matchInfos.info ? matchInfos.info.participants.map(tile => (
										<TableBody>
											<TableRow key="oui">
												<TableCell component="th" scope="row">
													<img className={classes.image} src={tile.companion.linkPicture} alt={"perso1"} />
													<Typography className={classes.name}>{tile.name}</Typography>
												</TableCell>
												<TableCell align="right">
													<Typography className={classes.text}>{tile.level}</Typography>
												</TableCell>
												<TableCell align="right">
													<Typography className={classes.text}>{tile.last_round}</Typography>
												</TableCell>
												<TableCell align="right">
													<Typography className={classes.text}>{tile.placement}</Typography>
												</TableCell>
												<TableCell align="right">
													<Typography className={classes.text}>{tile.gold_left}</Typography>
												</TableCell>
											</TableRow>
											</TableBody>
									)) : "oui"}
											</Table>
							</CardContent>
						</Collapse>
					</div>
				</div>
			);
		}
	}
}

Tft.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Tft;


