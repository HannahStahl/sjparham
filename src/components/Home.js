import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const Home = () => (
  <div className="home">
    <img src="home.jpg" alt="S J Parham Photography" />
    <h1>S J PARHAM</h1>
    <h2>PHOTOGRAPHY</h2>
    <Nav.Link to="/galleries" as={NavLink}>
      <Button variant="outline-light">
        View Galleries
      </Button>
    </Nav.Link>
  </div>
);

export default Home;
