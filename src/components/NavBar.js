import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => (
  <>
    <div className="nav-link-container logo">
      <Nav.Link
        to={{ pathname: '/', state: { prevPathname: window.location.pathname } }}
        as={NavLink}
      >
        <p className="line-1">S J PARHAM</p>
        <p className="line-2">PHOTOGRAPHY</p>
      </Nav.Link>
    </div>
    {window.location.pathname !== '/' && (
      <div className="header-logo-container">
        <Nav.Link to="/" as={NavLink} className="header-logo">
          <p className="line-1">S J PARHAM</p>
          <p className="line-2">PHOTOGRAPHY</p>
        </Nav.Link>
      </div>
    )}
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav activeKey={`/${window.location.pathname.split('/')[1]}`}>
          <div className="nav-link-container link-to-page">
            <Nav.Link
              to={{ pathname: '/about', state: { prevPathname: window.location.pathname } }}
              as={NavLink}
            >
              <p>About</p>
            </Nav.Link>
          </div>
          <div className="nav-link-container link-to-page">
            <Nav.Link
              to={{ pathname: '/galleries', state: { prevPathname: window.location.pathname } }}
              as={NavLink}
            >
              <p>Galleries</p>
            </Nav.Link>
          </div>
          <div className="nav-link-container link-to-page">
            <Nav.Link
              to={{ pathname: '/contact', state: { prevPathname: window.location.pathname } }}
              as={NavLink}
            >
              <p>Contact</p>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </>
);

export default NavBar;
