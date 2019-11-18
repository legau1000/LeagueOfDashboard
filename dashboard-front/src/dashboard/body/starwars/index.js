import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core';

import StarWars from './components/Starwars';
import styles from './styles';

export default withStyles(styles)(withCookies(StarWars));
