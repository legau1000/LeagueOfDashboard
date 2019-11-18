import React from "react";
import PropTypes from "prop-types";
import AuthProvider from "./MicrosoftAuth/AuthProvider";

import { Grid, Typography } from '@material-ui/core';

import Dashboard from "../../dashboard/";
import logo from '../../dashboard/images/timo.png'

class Auth extends React.Component {
    static propTypes = {
        account: PropTypes.object,
        emailMessages: PropTypes.object,
        error: PropTypes.string,
        graphProfile: PropTypes.object,
        onSignIn: PropTypes.func.isRequired,
        onSignOut: PropTypes.func.isRequired,
        onRequestEmailToken: PropTypes.func.isRequired,
   		classes: PropTypes.object.isRequired
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <section>
                    {!this.props.account ? (
                        <>
                                <Grid  className={classes.container}>
                                <Typography className={classes.title}>Bienvenue dans la faille de l'invocateur</Typography>
                                <img src={logo} alt="logo" className={classes.logo} />
                                        <Grid item xs={4}>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <button className={classes.buttonWrapper} onClick={this.props.onSignIn} type="submit">
                                                Se connecter
                                        </button>
                                    </Grid>
                                </Grid>
                             </>
                        ) : (
                        <>
                            <Dashboard/>
                        </>
                    )}
                </section>
            </div>
        );
    }
}

export default AuthProvider(Auth);
