import React from 'react';
import content from '../content.json';

const About = () => (
  <div className="about">
    <img src="/about.jpg" alt="Steve Parham" />
    {content.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
  </div>
);

export default About;
