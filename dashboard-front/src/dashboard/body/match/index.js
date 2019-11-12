import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core';

import Match from './components/Match';
import styles from './styles';

export default withStyles(styles)(withCookies(Match));
