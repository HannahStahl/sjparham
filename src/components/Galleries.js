import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';
import config from '../config';

const Galleries = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    fetch(`${config.apiURL}/publishedCategories/${config.userID}`).then((res) => res.json()).then((categories) => {
      setGalleries(categories);
    });
  }, []);

  return (
    <div className="galleries">
      <Masonry className="grid" options={{ isFitWidth: true }}>
        {galleries.map((gallery) => (
          <a key={gallery.categoryId} href={`/galleries/${gallery.categoryId}`}>
            <img src={`${config.cloudfrontURL}/${gallery.categoryPhoto}`} alt={gallery.categoryName} />
          </a>
        ))}
      </Masonry>
    </div>
  );
};

export default Galleries;
