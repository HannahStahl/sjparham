import React, { useState, useEffect, useCallback } from 'react';
import Masonry from 'react-masonry-component';
import { Controlled as Zoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const Gallery = ({ match, galleries }) => {
  const [gallery, setGallery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [layoutComplete, setLayoutComplete] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const showPhotos = layoutComplete && imagesLoaded;

  useEffect(() => {
    if (match && galleries.length > 0) {
      const matchedGallery = galleries.find((galleryInList) => (
        galleryInList.name.toLowerCase() === unescape(match.params.name).replace(/_/g, ' ').toLowerCase()
      ));
      if (!matchedGallery) window.location.pathname = '/galleries';
      else setGallery(matchedGallery);
    }
  }, [match, galleries]);

  const incrementIndex = (amount) => {
    const newIndex = currentIndex + amount;
    if (newIndex >= 0 && newIndex < gallery.photos.length) {
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
    const mainPhoto = gallery.photos[currentIndex];
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
                src={mainPhoto.image.asset.url}
                alt={`S J Parham Photography - ${mainPhoto.title}`}
              />
            </Zoom>
          ) : (
            <img
              className="gallery-main-photo-img"
              src={mainPhoto.image.asset.url}
              alt={`S J Parham Photography - ${mainPhoto.title}`}
            />
          )}
        </div>
        <div className="main-photo-details">
          <h2>{mainPhoto.title}</h2>
          <p className="photo-description">{mainPhoto.description}</p>
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
      <span className="photo-index">{`${currentIndex + 1}/${gallery.photos.length}`}</span>
      <span
        className={`photo-arrow${currentIndex === gallery.photos.length - 1 ? ' disabled' : ''}`}
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
      {gallery.photos.map((photoInList, index) => (
        <div key={photoInList.title} onClick={() => setCurrentIndex(index)}>
          <img
            src={photoInList.image.asset.url}
            alt={`S J Parham Photography - ${photoInList.title}`}
          />
        </div>
      ))}
    </Masonry>
  );

  return (
    <div className="gallery">
      {gallery && (
        <>
          <h1>{gallery.name}</h1>
          {gallery.photos.length > 0 && (
            <>
              {renderMainPhoto()}
              {renderIndices()}
              {renderPhotoThumbnails()}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Gallery;
