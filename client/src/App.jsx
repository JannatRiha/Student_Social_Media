// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import Timeline from './components/Timeline';
import PostCreate from './components/PostCreate'; // <-- Import the new component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/create-post" element={<PostCreate />} /> {/* <-- Add the new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;