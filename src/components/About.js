import React from 'react';
import content from '../content.json';
import config from '../config';

const About = () => (
  <div className="about">
    <img src={`${config.publicCloudfrontURL}/about2.JPG`} alt="Steve Parham" />
    {content.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
  </div>
);

export default About;
