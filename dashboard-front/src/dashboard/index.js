import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core';

import Dashboard from './components/Dashboard';
import styles from './styles';

export default withStyles(styles)(withCookies(Dashboard));
