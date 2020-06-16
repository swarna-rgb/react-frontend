import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import EditForm from './components/EditForm';
class Root extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/edit' component={EditForm} />
        <Route exact path='/' component={App} />
      </Switch>
    );
  }
}

export default Root;
