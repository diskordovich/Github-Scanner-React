import React, { Component } from 'react';
import {Route, Routes, Link} from "react-router-dom"
import './App.css';
import HomePage from './components/homePage/homePage';
import ResumePage from './components/resumePage/resumePage';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/:id' element={<ResumePage/>}></Route>
      </Routes>
    );
  }
}

export default App;
