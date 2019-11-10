import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from '../../../tileData';

const Body = ({ classes }) => (
	<div>
		<div className={classes.root}>
			<GridList cellHeight={300} cellWidth={300} className={classes.gridList} cols={3}>
				{tileData.map(tile => (
					<GridListTile key={tile.img} cols={tile.cols}>
						<img src={tile.img} alt={tile.title} />
					</GridListTile>
				))}
			</GridList>
		</div>
		body
	</div>
);

Body.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Body;