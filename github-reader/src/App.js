import React, { Component } from 'react';
import {Route, Routes, Link} from "react-router-dom"
import './App.css';
import HomePage from './components/homePage/homePage';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/:id' element={<div>Id page</div>}></Route>
      </Routes>
    );
  }
}

export default App;
