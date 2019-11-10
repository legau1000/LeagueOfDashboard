import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core';

import ListDashboard from './components/List';
import styles from './styles';

export default withStyles(styles)(withCookies(ListDashboard));
