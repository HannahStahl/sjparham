import React, { useState, useEffect, useCallback } from 'react';
import Masonry from 'react-masonry-component';
import { Controlled as Zoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import config from '../config';

const Gallery = (props) => {
  const { match, galleries } = props;
  const [gallery, setGallery] = useState({});
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [layoutComplete, setLayoutComplete] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const showPhotos = layoutComplete && imagesLoaded;

  useEffect(() => {
    if (match && galleries.length > 0) {
      const category = galleries.find((categoryInList) => (
        categoryInList.categoryName.toLowerCase() === unescape(match.params.name).replace(/_/g, ' ').toLowerCase()
      ));
      if (!category) window.location.pathname = '/galleries';
      else {
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
              (photoInList) => photoInList.photoId === photoIds[0],
            );
            photosInGallery[index].itemPhoto = itemPhoto.photoName;
          });
          setPhotos(photosInGallery);
        });
      }
    }
  }, [match, galleries]);

  const incrementIndex = (amount) => {
    const newIndex = currentIndex + amount;
    if (newIndex >= 0 && newIndex < photos.length) {
      setCurrentIndex(newIndex);
    }
  };

  const handleZoomChange = useCallback((shouldZoom) => {
    const { body } = document;
    if (shouldZoom) {
      setIsZoomed(true);
      body.style.height = '100vh';
      body.style.overflow = 'hidden';
    } else {
      setIsZoomed(false);
      body.style.height = 'auto';
      body.style.overflow = 'auto';
    }
  }, []);

  const renderMainPhoto = () => {
    const mainPhoto = photos[currentIndex];
    return (
      <div className="main-photo-container">
        <div className="main-photo">
          {window.innerWidth > 680 ? (
            <Zoom
              zoomMargin={50}
              overlayBgColorStart="transparent"
              overlayBgColorEnd="rgba(0, 0, 0, 0.7)"
              isZoomed={isZoomed}
              onZoomChange={handleZoomChange}
            >
              <img
                className="gallery-main-photo-img"
                src={`${config.cloudfrontURL}/${mainPhoto.itemPhoto}`}
                alt={`S J Parham Photography - ${mainPhoto.itemName}`}
              />
            </Zoom>
          ) : (
            <img
              className="gallery-main-photo-img"
              src={`${config.cloudfrontURL}/${mainPhoto.itemPhoto}`}
              alt={`S J Parham Photography - ${mainPhoto.itemName}`}
            />
          )}
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
    <Masonry
      className={`grid ${showPhotos ? 'visible' : 'hidden'}`}
      options={{ isFitWidth: true }}
      onLayoutComplete={(layout) => { if (layout.length > 0) setLayoutComplete(true); }}
      onImagesLoaded={(images) => { if (images.images.length > 0) setImagesLoaded(true); }}
    >
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
