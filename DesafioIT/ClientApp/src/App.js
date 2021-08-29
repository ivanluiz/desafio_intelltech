import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchDiretorio } from './components/FetchDiretorio'
import { AddDiretorio } from './components/AddDiretorio'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/fetch-diretorio' component={FetchDiretorio} />
            <Route path='/addDiretorio/' component={AddDiretorio} />
            <Route path='/diretorio/edit/:id' component={AddDiretorio} />
      </Layout>
    );
  }
}
