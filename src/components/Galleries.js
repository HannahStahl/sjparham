import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Masonry from 'react-masonry-component';

const Galleries = ({ galleries }) => {
  const [layoutComplete, setLayoutComplete] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const showPhotos = layoutComplete && imagesLoaded;

  return (
    <div className="galleries">
      <Masonry
        className={`grid ${showPhotos ? 'visible' : 'hidden'}`}
        options={{ isFitWidth: true }}
        onLayoutComplete={(layout) => { if (layout.length > 0) setLayoutComplete(true); }}
        onImagesLoaded={(images) => { if (images.images.length > 0) setImagesLoaded(true); }}
      >
        {galleries.map((gallery) => (
          <Nav.Link
            key={gallery._id}
            to={{
              pathname: escape(`/galleries/${gallery.name.replace(/ /g, '_').toLowerCase()}`),
              state: { prevPathname: window.location.pathname },
            }}
            as={NavLink}
          >
            <img
              className="category-photo"
              src={gallery.previewPhoto.asset.url}
              alt={`S J Parham Photography - ${gallery.name}`}
            />
            <div className="category-name"><h2>{gallery.name}</h2></div>
          </Nav.Link>
        ))}
      </Masonry>
    </div>
  );
};

export default Galleries;
