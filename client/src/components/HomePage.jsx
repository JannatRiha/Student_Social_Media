// client/src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Student Social Network</h1>
        <p>Connect, collaborate, and share academic resources in real-time.</p>
      </header>
      <section className="home-cta">
        <Link to="/register" className="cta-button">Sign Up</Link>
        <Link to="/login" className="cta-button">Log In</Link> 
      </section>
    </div>
  );
}

export default HomePage;