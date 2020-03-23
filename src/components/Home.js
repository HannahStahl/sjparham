import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const Home = () => {
  useEffect(() => {
    const navLinks = document.getElementsByClassName('link-to-page');
    Array.from(navLinks).forEach((navLink) => {
      navLink.setAttribute('class', 'link-to-page nav-link wide');
    });
    const logo = document.getElementsByClassName('logo')[0];
    if (logo) {
      logo.setAttribute('class', 'logo nav-link active shrunk');
    }
    document.getElementById('logo-overlay').setAttribute('class', 'logo-overlay enlarged');
    document.getElementById('view-galleries-link').setAttribute('class', 'view-galleries-link visible');
  }, []);

  return (
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
};

export default Home;
