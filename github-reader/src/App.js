import React, { Component } from 'react';
import {Route, Routes, Link} from "react-router-dom"
import './App.css';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path='/' element={<div>Home</div>}></Route>
        <Route path='/:id' element={<div>Id page</div>}></Route>
      </Routes>
    );
  }
}

export default App;
