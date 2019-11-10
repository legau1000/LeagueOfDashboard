import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core';

import Header from './components/Header';
import styles from './styles';

export default withStyles(styles)(withCookies(Header));
