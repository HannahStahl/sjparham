import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const Home = () => (
  <div className="home">
    <img src="home.jpg" alt="S J Parham Photography" />
    <div className="logo-overlay" id="logo-overlay">
      <p className="line-1">S J PARHAM</p>
      <p className="line-2">PHOTOGRAPHY</p>
    </div>
    <Nav.Link to="/galleries" as={NavLink} className="view-galleries-link" id="view-galleries-link">
      <Button variant="outline-light" className="view-galleries-btn">
        View Galleries
      </Button>
    </Nav.Link>
  </div>
);

export default Home;
