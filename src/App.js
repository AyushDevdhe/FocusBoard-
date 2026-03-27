import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard.js';
import Navbar from './components/Navbar.js';


function App() {
  return (
    <div className="App">
     <h1>FocusBoard</h1>
     <Navbar></Navbar>
     <Dashboard></Dashboard>
    </div>
  );
}

export default App;
