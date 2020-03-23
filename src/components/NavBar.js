import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => (
  <>
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
        <Nav className="ml-auto mr-auto" activeKey={`/${window.location.pathname.split('/')[1]}`}>
          <Nav.Link
            to={{ pathname: '/about', state: { prevPathname: window.location.pathname } }}
            as={NavLink}
            className="link-to-page"
          >
            <p>About</p>
          </Nav.Link>
          <Nav.Link
            to={{ pathname: '/galleries', state: { prevPathname: window.location.pathname } }}
            as={NavLink}
            className="link-to-page"
          >
            <p>Galleries</p>
          </Nav.Link>
          <Nav.Link
            to={{ pathname: '/', state: { prevPathname: window.location.pathname } }}
            as={NavLink}
            className="logo"
          >
            <p className="line-1">S J PARHAM</p>
            <p className="line-2">PHOTOGRAPHY</p>
          </Nav.Link>
          <Nav.Link
            to={{ pathname: '/contact', state: { prevPathname: window.location.pathname } }}
            as={NavLink}
            className="link-to-page"
          >
            <p>Contact</p>
          </Nav.Link>
          <Nav.Link
            href="https://www.instagram.com/steve.parham.photography/"
            className="link-to-page"
            target="_blank"
            rel="noopener nereferrer"
          >
            <p>Instagram</p>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </>
);

export default NavBar;
