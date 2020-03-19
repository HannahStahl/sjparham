import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';
import config from '../config';

const Gallery = (props) => {
  const { match, galleries } = props;
  const [gallery, setGallery] = useState({});
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (galleries.length > 0) {
      const category = galleries.find((categoryInList) => (
        categoryInList.categoryName.toLowerCase() === match.params.name.replace(/_/g, ' ').toLowerCase()
      ));
      setGallery(category);
      const promises = [
        fetch(`${config.apiURL}/publishedItems/${config.userID}/${category.categoryId}`).then((res) => res.json()),
        fetch(`${config.apiURL}/itemsToPhotos/${config.userID}`).then((res) => res.json()),
        fetch(`${config.apiURL}/photos/${config.userID}`).then((res) => res.json()),
      ];
      Promise.all(promises).then((results) => {
        const [photosInGallery, photoMapping, allPhotos] = results;
        photosInGallery.forEach((photoInGallery, index) => {
          const photoIds = photoMapping
            .filter((row) => row.itemId === photoInGallery.itemId)
            .map((row) => row.photoId);
          const itemPhoto = allPhotos.find(
            (photoInList) => photoInList.photoId === photoIds[currentIndex],
          );
          photosInGallery[index].itemPhoto = itemPhoto.photoName;
        });
        setPhotos(photosInGallery);
      });
    }
  }, [match.params.name, galleries]);

  const incrementIndex = (amount) => {
    const newIndex = currentIndex + amount;
    if (newIndex >= 0 && newIndex < photos.length) {
      setCurrentIndex(newIndex);
    }
  };

  const renderMainPhoto = () => {
    const mainPhoto = photos[currentIndex];
    return (
      <div className="main-photo-container">
        <div className="main-photo">
          <img
            src={`${config.cloudfrontURL}/${mainPhoto.itemPhoto}`}
            alt={`S J Parham Photography - ${mainPhoto.itemName}`}
          />
        </div>
        <div className="main-photo-details">
          <h2>{mainPhoto.itemName}</h2>
          <p className="photo-description">{mainPhoto.itemDescription}</p>
        </div>
      </div>
    );
  };

  const renderIndices = () => (
    <p className="photo-index-container">
      <span
        className={`photo-arrow${currentIndex === 0 ? ' disabled' : ''}`}
        onClick={() => incrementIndex(-1)}
      >
        {'<'}
      </span>
      <span className="photo-index">{`${currentIndex + 1}/${photos.length}`}</span>
      <span
        className={`photo-arrow${currentIndex === photos.length - 1 ? ' disabled' : ''}`}
        onClick={() => incrementIndex(1)}
      >
        {'>'}
      </span>
    </p>
  );

  const renderPhotoThumbnails = () => (
    <Masonry className="grid" options={{ isFitWidth: true }}>
      {photos.map((photoInList, index) => (
        <div key={photoInList.itemId} onClick={() => setCurrentIndex(index)}>
          <img
            src={`${config.cloudfrontURL}/${photoInList.itemPhoto}`}
            alt={`S J Parham Photography - ${photoInList.itemName}`}
          />
        </div>
      ))}
    </Masonry>
  );

  return (
    <div className="gallery">
      {gallery.categoryName && <h1>{gallery.categoryName}</h1>}
      {photos.length > 0 && (
        <>
          {renderMainPhoto()}
          {renderIndices()}
          {renderPhotoThumbnails()}
        </>
      )}
    </div>
  );
};

export default Gallery;
