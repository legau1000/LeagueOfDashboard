import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import Authentification from './authentification';

const RouteComponent = ({
  component: Component,
  layout: Layout,
  layoutParams,
  ...rest
}) => (
    <Route
      {...rest}
      render={props => (
          <Component {...props} />
      )}
    />
  );

export default () => (
  <CookiesProvider>
      <Router history={history}>
        <Switch>
          <RouteComponent
            exact
            path="/"
            component={Authentification}
          />
        </Switch>
      </Router>
  </CookiesProvider>
);