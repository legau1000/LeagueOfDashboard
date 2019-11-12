import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export default function ListDashboard({classes}) {
	const [checked, setChecked] = React.useState([0]);

	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		console.log(value);
		console.log(newChecked);
		setChecked(newChecked);
	};

	return (
		<List className={classes.root}>
			{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(value => {
				const labelId = `checkbox-list-label-${value}`;

				return (
					<ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
						<ListItemIcon>
							<Checkbox
								edge="start"
								checked={checked.indexOf(value) !== -1}
								tabIndex={-1}
								disableRipple
								inputProps={{ 'aria-labelledby': labelId }}
							/>
						</ListItemIcon>
						<ListItemText id={labelId} primary={`Widget Riot ${value + 1}`} className={classes.itemText} />
					</ListItem>
				);
			})}
		</List>
	);
}

