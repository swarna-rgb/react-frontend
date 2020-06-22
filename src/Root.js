import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import EditForm from './components/EditForm';
import { AuthView } from './components/JWT';
class Root extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/edit' component={EditForm} />
        <Route exact path='/' component={App} />
        <Route exact path='/auth' component={AuthView} />
      </Switch>
    );
  }
}

export default Root;
