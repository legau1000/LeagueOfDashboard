import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core';

import Body from './components/Body';
import styles from './styles';

export default withStyles(styles)(withCookies(Body));
