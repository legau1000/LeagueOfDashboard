import React  from 'react';
import PropTypes from 'prop-types';

import {
	Typography, CardContent, Collapse, GridList, GridListTile, GridListTileBar,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import LogoLol from '../../../images/logo_lol.png';


class Header extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			Rotation: [],
			expanded: false,
		};
	}
	

	componentDidMount() {
		const url = "https://0.0.0.0:5001/lol/Rotation";

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
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	 handleExpandClick = () => {
			if (this.expanded)
			{
				this.setState({ expanded: false })
				this.expanded = false;
			}
			else if (!this.expanded)
			{
				this.setState({ expanded: true })
				this.expanded = true;
			}
		};

	render() {
		const { error, isLoaded, Rotation, expanded } = this.state;
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
			<Typography className={classes.title}>Les 15 héros de la semaine</Typography>
			<img src={LogoLol} className={classes.logo} alt="champion" />
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
							<div>
								<div>
										<GridList cellHeight={100} cellWidth={100} className={classes.gridList}>
											{Rotation.map(tile => (
												<GridListTile key={tile.img} >
													<img src={tile.linkPicture} className={classes.image}alt="champion"/>
													<GridListTileBar
														title={tile.name}
														titlePosition="top"
														actionIcon={
															<IconButton aria-label={`star ${tile.name}`} >
															</IconButton>
														}
														actionPosition="left"
													/>
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

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Header;
