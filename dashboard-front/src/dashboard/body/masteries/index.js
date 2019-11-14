import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core';

import Masteries from './components/Masteries';
import styles from './styles';

export default withStyles(styles)(withCookies(Masteries));
