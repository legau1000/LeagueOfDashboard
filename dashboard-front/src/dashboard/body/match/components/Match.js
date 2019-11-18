import React from 'react';
import PropTypes from 'prop-types';

import {
	Typography, Grid, CardContent, Collapse, Table, TableBody, TableCell, TableRow,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LogoLol from '../../../images/logo_lol.png';


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
		fetch(`https://0.0.0.0:5001/lol/games/${this.state.matchId.matches[0].gameId}`)
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
		const { error, isLoaded, expanded, matchInfos, matchId } = this.state;
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
						<img src={LogoLol} className={classes.logo} alt="champion" />
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<div>
									<Typography className={classes.title1}>{this.timeConverter(matchId.matches[0].timestamp)}</Typography>
									<Typography className={classes.title1}>{matchInfos.gameMode}</Typography>
									<Grid container>									
										<Grid item xs={12} className={classes.grid1}>
											<Typography className={matchInfos.teams ? matchInfos.teams[0].win=== "Win" ? classes.teamRed : classes.teamBlue : "oui"}>{matchInfos.teams ? matchInfos.teams[0].win=== "Win" ? "Win" : "Loose" : "oui"}</Typography>
											<Table className={classes.table} aria-label="simple table">
												<TableBody>										
													<TableRow key="oui">
             										 <TableCell component="th" scope="row">
															<img className={classes.image} src={matchInfos.participants ? matchInfos.participants[0].championIdPicture : "oui"} alt={"perso1"} />
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[0].championName : "oui"} - {matchInfos.participants ? matchInfos.participants[0].name : "oui"}</Typography>
													</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[0].timeline.lane : "oui"}</Typography>
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[0].timeline.role : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[0].stats.kills : "oui"} / {matchInfos.participants ? matchInfos.participants[0].stats.deaths : "oui"} / {matchInfos.participants ? matchInfos.participants[0].stats.assists : "oui"}</Typography>
														</TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[0].stats.item0Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[0].stats.item1Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[0].stats.item2Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[0].stats.item3Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[0].stats.item4Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[0].stats.item5Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[0].stats.item6Picture : "oui"} alt={"perso1"} /></TableCell>
													<TableCell align="right">y</TableCell>
									 		
													</TableRow>
													<TableRow key="oui">
														<TableCell component="th" scope="row">
															<img className={classes.image} src={matchInfos.participants ? matchInfos.participants[1].championIdPicture : "oui"} alt={"perso1"} />
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[1].championName : "oui"}  - {matchInfos.participants ? matchInfos.participants[1].name : "oui"}</Typography>
														</TableCell>

														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[1].timeline.lane : "oui"}</Typography>
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[1].timeline.role : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[1].stats.kills : "oui"} / {matchInfos.participants ? matchInfos.participants[1].stats.deaths : "oui"} / {matchInfos.participants ? matchInfos.participants[1].stats.assists : "oui"}</Typography>
														</TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[1].stats.item0Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[1].stats.item1Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[1].stats.item2Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[1].stats.item3Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[1].stats.item4Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[1].stats.item5Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[1].stats.item6Picture : "oui"} alt={"perso1"} /></TableCell>
										 
													</TableRow>
													<TableRow key="oui">
														<TableCell component="th" scope="row">
															<img className={classes.image} src={matchInfos.participants ? matchInfos.participants[2].championIdPicture : "oui"} alt={"perso1"} />
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[2].championName : "oui"}  - {matchInfos.participants ? matchInfos.participants[2].name : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[2].timeline.lane : "oui"}</Typography>
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[2].timeline.role : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[2].stats.kills : "oui"} / {matchInfos.participants ? matchInfos.participants[2].stats.deaths : "oui"} / {matchInfos.participants ? matchInfos.participants[2].stats.assists : "oui"}</Typography>
														</TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[2].stats.item0Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[2].stats.item1Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[2].stats.item2Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[2].stats.item3Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[2].stats.item4Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[2].stats.item5Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[2].stats.item6Picture : "oui"} alt={"perso1"} /></TableCell>
										 
													</TableRow>
													<TableRow key="oui">
														<TableCell component="th" scope="row">
															<img className={classes.image} src={matchInfos.participants ? matchInfos.participants[3].championIdPicture : "oui"} alt={"perso1"} />
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[3].championName : "oui"} - {matchInfos.participants ? matchInfos.participants[3].name : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[3].timeline.lane : "oui"}</Typography>
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[3].timeline.role : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[3].stats.kills : "oui"} / {matchInfos.participants ? matchInfos.participants[3].stats.deaths : "oui"} / {matchInfos.participants ? matchInfos.participants[3].stats.assists : "oui"}</Typography>
														</TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[3].stats.item0Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[3].stats.item1Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[3].stats.item2Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[3].stats.item3Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[3].stats.item4Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[3].stats.item5Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[3].stats.item6Picture : "oui"} alt={"perso1"} /></TableCell>
										 
													</TableRow>
													<TableRow key="oui">
														<TableCell component="th" scope="row">
															<img className={classes.image} src={matchInfos.participants ? matchInfos.participants[4].championIdPicture : "oui"} alt={"perso1"} />
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[4].championName : "oui"} - {matchInfos.participants ? matchInfos.participants[4].name : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[4].timeline.lane : "oui"}</Typography>
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[4].timeline.role : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[4].stats.kills : "oui"} / {matchInfos.participants ? matchInfos.participants[4].stats.deaths : "oui"} / {matchInfos.participants ? matchInfos.participants[4].stats.assists : "oui"}</Typography>
														</TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[4].stats.item0Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[4].stats.item1Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[4].stats.item2Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[4].stats.item3Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[4].stats.item4Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[4].stats.item5Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[4].stats.item6Picture : "oui"} alt={"perso1"} /></TableCell>
										 
													</TableRow>									
												</TableBody>
											</Table>
									</Grid>
									<Grid item xs={12}>
											<Typography className={matchInfos.teams ? matchInfos.teams[1].win === "Win" ? classes.teamRed : classes.teamBlue : "oui" }>{matchInfos.teams ? matchInfos.teams[1].win === "Win" ? "Win" : "Loose" : "oui"}</Typography>
											<Table className={classes.table} aria-label="simple table">
												<TableBody>
													<TableRow key="oui">
														<TableCell component="th" scope="row">
															<img className={classes.image} src={matchInfos.participants ? matchInfos.participants[5].championIdPicture : "oui"} alt={"perso1"} />
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[5].championName : "oui"} - {matchInfos.participants ? matchInfos.participants[5].name : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[5].timeline.lane : "oui"}</Typography>
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[5].timeline.role : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[5].stats.kills : "oui"} / {matchInfos.participants ? matchInfos.participants[5].stats.deaths : "oui"} / {matchInfos.participants ? matchInfos.participants[5].stats.assists : "oui"}</Typography>
														</TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[5].stats.item0Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[5].stats.item1Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[5].stats.item2Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[5].stats.item3Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[5].stats.item4Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[5].stats.item5Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[5].stats.item6Picture : "oui"} alt={"perso1"} /></TableCell>
										 
													</TableRow>
													<TableRow key="oui">
														<TableCell component="th" scope="row">
															<img className={classes.image} src={matchInfos.participants ? matchInfos.participants[6].championIdPicture : "oui"} alt={"perso1"} />
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[6].championName : "oui"} - {matchInfos.participants ? matchInfos.participants[6].name : "oui"}</Typography>
														</TableCell>

														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[6].timeline.lane : "oui"}</Typography>
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[6].timeline.role : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[6].stats.kills : "oui"} / {matchInfos.participants ? matchInfos.participants[6].stats.deaths : "oui"} / {matchInfos.participants ? matchInfos.participants[6].stats.assists : "oui"}</Typography>
														</TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[6].stats.item0Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[6].stats.item1Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[6].stats.item2Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[6].stats.item3Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[6].stats.item4Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[6].stats.item5Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[6].stats.item6Picture : "oui"} alt={"perso1"} /></TableCell>
										 
													</TableRow>
													<TableRow key="oui">
														<TableCell component="th" scope="row">
															<img className={classes.image} src={matchInfos.participants ? matchInfos.participants[7].championIdPicture : "oui"} alt={"perso1"} />
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[7].championName : "oui"} - {matchInfos.participants ? matchInfos.participants[7].name : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[7].timeline.lane : "oui"}</Typography>
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[7].timeline.role : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[7].stats.kills : "oui"} / {matchInfos.participants ? matchInfos.participants[7].stats.deaths : "oui"} / {matchInfos.participants ? matchInfos.participants[7].stats.assists : "oui"}</Typography>
														</TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[7].stats.item0Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[7].stats.item1Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[7].stats.item2Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[7].stats.item3Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[7].stats.item4Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[7].stats.item5Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[7].stats.item6Picture : "oui"} alt={"perso1"} /></TableCell>
										 
													</TableRow>
													<TableRow key="oui">
														<TableCell component="th" scope="row">
															<img className={classes.image} src={matchInfos.participants ? matchInfos.participants[8].championIdPicture : "oui"} alt={"perso1"} />
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[8].championName : "oui"} - {matchInfos.participants ? matchInfos.participants[8].name : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[8].timeline.lane : "oui"}</Typography>
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[8].timeline.role : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[8].stats.kills : "oui"} / {matchInfos.participants ? matchInfos.participants[8].stats.deaths : "oui"} / {matchInfos.participants ? matchInfos.participants[8].stats.assists : "oui"}</Typography>
														</TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[8].stats.item0Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[8].stats.item1Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[8].stats.item2Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[8].stats.item3Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[8].stats.item4Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[8].stats.item5Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[8].stats.item6Picture : "oui"} alt={"perso1"} /></TableCell>
										 
													</TableRow>
													<TableRow key="oui">
														<TableCell component="th" scope="row">
															<img className={classes.image} src={matchInfos.participants ? matchInfos.participants[9].championIdPicture : "oui"} alt={"perso1"} />
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[9].championName : "oui"} - {matchInfos.participants ? matchInfos.participants[9].name : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[9].timeline.lane : "oui"}</Typography>
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[9].timeline.role : "oui"}</Typography>
														</TableCell>
														<TableCell align="right">
															<Typography className={classes.text}>{matchInfos.participants ? matchInfos.participants[9].stats.kills : "oui"} / {matchInfos.participants ? matchInfos.participants[9].stats.deaths : "oui"} / {matchInfos.participants ? matchInfos.participants[9].stats.assists : "oui"}</Typography>
														</TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[9].stats.item0Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[9].stats.item1Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[9].stats.item2Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[9].stats.item3Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[9].stats.item4Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[9].stats.item5Picture : "oui"} alt={"perso1"} /></TableCell>
														<TableCell align="right"><img className={classes.image} src={matchInfos.participants ? matchInfos.participants[9].stats.item6Picture : "oui"} alt={"perso1"} /></TableCell>
										 
													</TableRow>
												</TableBody>
											</Table>
											</Grid>
									</Grid>
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


