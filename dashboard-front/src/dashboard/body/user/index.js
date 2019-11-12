import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core';

import User from './components/User';
import styles from './styles';

export default withStyles(styles)(withCookies(User));
