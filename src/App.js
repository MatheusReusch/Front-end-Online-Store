import React from 'react';
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProductsList from './ProductsList';

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
         <Route exact path="/" component={ ProductsList }></Route>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
