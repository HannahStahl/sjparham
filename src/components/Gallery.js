import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';
import config from '../config';

const Gallery = (props) => {
  const { match } = props;
  const [gallery, setGallery] = useState({ categoryId: match.params.id });
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const promises = [
      fetch(`${config.apiURL}/category/${config.userID}/${gallery.categoryId}`).then((res) => res.json()),
      fetch(`${config.apiURL}/publishedItems/${config.userID}/${gallery.categoryId}`).then((res) => res.json()),
      fetch(`${config.apiURL}/itemsToPhotos/${config.userID}`).then((res) => res.json()),
      fetch(`${config.apiURL}/photos/${config.userID}`).then((res) => res.json()),
    ];
    Promise.all(promises).then((results) => {
      const [galleryDetails, photosInGallery, photoMapping, allPhotos] = results;
      setGallery(galleryDetails);
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
  }, [match.params.id]);

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
          <img src={`${config.cloudfrontURL}/${mainPhoto.itemPhoto}`} alt={mainPhoto.itemName} />
        </div>
        <div className="main-photo-details">
          <h2>{mainPhoto.itemName}</h2>
          <p className="photo-description">{mainPhoto.itemDescription}</p>
          <p>
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
        </div>
      </div>
    );
  };

  const renderPhotoThumbnails = () => (
    <Masonry className="grid" options={{ isFitWidth: true }}>
      {photos.map((photoInList, index) => (
        <div key={photoInList.itemId} onClick={() => setCurrentIndex(index)}>
          <img src={`${config.cloudfrontURL}/${photoInList.itemPhoto}`} alt={photoInList.itemName} />
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
          {renderPhotoThumbnails()}
        </>
      )}
    </div>
  );
};

export default Gallery;
