import React from 'react';
import { Header } from './components';
import Navigation from './navigation';
import './styles';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
      </div>
    )
  }
}