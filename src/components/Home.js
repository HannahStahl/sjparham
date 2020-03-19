import React from 'react';
import Button from 'react-bootstrap/Button';

const Home = () => (
  <div className="home">
    <img src="home.jpg" alt="S J Parham Photography" />
    <h1>S J PARHAM</h1>
    <h2>PHOTOGRAPHY</h2>
    <Button variant="outline-light" onClick={() => { window.location.pathname = '/galleries'; }}>
      View Galleries
    </Button>
  </div>
);

export default Home;
