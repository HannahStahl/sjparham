import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => (
  <Navbar collapseOnSelect expand="lg">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto mr-auto" activeKey={window.location.pathname}>
        <Nav.Link href="/about" className="link-to-page">
          <p>About</p>
        </Nav.Link>
        <Nav.Link href="/galleries" className="link-to-page">
          <p>Galleries</p>
        </Nav.Link>
        {window.location.pathname !== '/' && (
          <Nav.Link href="/" className="logo">
            <p className="line-1">S J PARHAM</p>
            <p className="line-2">PHOTOGRAPHY</p>
          </Nav.Link>
        )}
        <Nav.Link href="/contact" className="link-to-page">
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
);

export default NavBar;
