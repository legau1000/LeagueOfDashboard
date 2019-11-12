import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core';

import Rotation from './components/Rotation';
import styles from './styles';

export default withStyles(styles)(withCookies(Rotation));
