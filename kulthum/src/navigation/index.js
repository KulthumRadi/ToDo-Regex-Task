import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Register from '../screens/Register';
import { AuthContext } from '../context/auth';
import { isValidlogin } from '../utils';

function AuthenticatedRoute ({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isValidlogin ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

class Navigation extends Component {
  render() {
    return (
      <AuthContext.Provider>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <AuthenticatedRoute exact path='/home' component={Home} />
            <Route path='*' component={Login} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default Navigation;