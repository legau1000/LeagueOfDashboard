import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core';

import Tft from './components/Tft';
import styles from './styles';

export default withStyles(styles)(withCookies(Tft));
