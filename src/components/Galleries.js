import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Masonry from 'react-masonry-component';
import config from '../config';

const Galleries = () => {
  const [galleries, setGalleries] = useState([]);
  const [showPhotos, setShowPhotos] = useState(false);

  useEffect(() => {
    fetch(`${config.apiURL}/publishedCategories/${config.userID}`).then((res) => res.json()).then((categories) => {
      setGalleries(categories);
    });
  }, []);

  return (
    <div className="galleries">
      <style>
        {`.grid {
          opacity: ${showPhotos ? '1' : '0'}
        }`}
      </style>
      <Masonry
        className="grid"
        options={{ isFitWidth: true }}
        onLayoutComplete={() => setShowPhotos(true)}
      >
        {galleries.map((gallery) => (
          <Nav.Link
            key={gallery.categoryId}
            to={{
              pathname: escape(`/galleries/${gallery.categoryName.replace(/ /g, '_').toLowerCase()}`),
              state: { prevPathname: window.location.pathname },
            }}
            as={NavLink}
          >
            <img
              className="category-photo"
              src={`${config.cloudfrontURL}/${gallery.categoryPhoto}`}
              alt={`S J Parham Photography - ${gallery.categoryName}`}
            />
            <div className="category-name"><h2>{gallery.categoryName}</h2></div>
          </Nav.Link>
        ))}
      </Masonry>
    </div>
  );
};

export default Galleries;
