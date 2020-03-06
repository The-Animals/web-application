import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Search } from './components/Search';

import CssBaseline from '@material-ui/core/CssBaseline';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
  return (
    <React.Fragment>
    <CssBaseline />
    <Layout>          
        <Route exact path='/' component={Home} />
        <Route path='/search' component={Search} />
        <Route path='/fetch-data' component={FetchData} />
    </Layout>
    </React.Fragment>
  );
  }
}
