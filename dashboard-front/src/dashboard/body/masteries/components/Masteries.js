import React  from 'react';
import PropTypes from 'prop-types';

import {
	Typography, GridList, GridListTile, GridListTileBar, CardContent, Collapse
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LogoLol from '../../../images/logo_lol.png';



class Masteries extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		account: PropTypes.string.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			User: [],
			expanded: false,
		};
	}

	componentDidMount() {
		const url = "https://0.0.0.0:5001/lol/masteries/details/mananka";

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
	};

	render() {
		const { error, isLoaded, User, expanded } = this.state;
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
						<Typography className={classes.title}>Vos champions</Typography>
						<img src={LogoLol} className={classes.logo} alt="champion" />
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<div>
									<div>
										<GridList cellHeight={200} cellWidth={200} cols={2} className={classes.gridList}>
											{User.map(tile => (
												<GridListTile key={tile.image} >
													<img src={tile.linkPicture} className={classes.image} alt="champion" />
													<GridListTileBar
														title={tile.name}
														titlePosition="top"
														actionPosition="right"
													/>
													<Typography className={classes.level}>Level : {tile.championLevel}</Typography>
													<Typography className={classes.points}>Points : {tile.championPoints}</Typography>
													<Typography className={classes.time}>Dernière fois joué : {this.timeConverter(tile.lastPlayTime)}</Typography>
												</GridListTile>
											))}
										</GridList>
									</div>
								</div>
							</CardContent>
						</Collapse>
					</div>
				</div>
			);
		}
	}
}

Masteries.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Masteries;

