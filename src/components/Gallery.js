import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';
import config from '../config';

const Gallery = (props) => {
  const { match } = props;
  const galleryId = match.params.id;
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState(undefined);

  useEffect(() => {
    const promises = [
      fetch(`${config.apiURL}/publishedItems/${config.userID}/${galleryId}`).then((res) => res.json()),
      fetch(`${config.apiURL}/itemsToPhotos/${config.userID}`).then((res) => res.json()),
      fetch(`${config.apiURL}/photos/${config.userID}`).then((res) => res.json()),
    ];
    Promise.all(promises).then((results) => {
      const [photosInGallery, photoMapping, allPhotos] = results;
      photosInGallery.forEach((photoInGallery, index) => {
        const photoIds = photoMapping
          .filter((row) => row.itemId === photoInGallery.itemId)
          .map((row) => row.photoId);
        const itemPhoto = allPhotos.find((photoInList) => photoInList.photoId === photoIds[0]);
        photosInGallery[index].itemPhoto = itemPhoto.photoName;
      });
      setPhotos(photosInGallery);
      setPhoto(photosInGallery[0]);
    });
  }, [galleryId]);

  const updateMainPhoto = () => {
    console.log('here');
  };

  return (
    <div className="gallery">
      {photo && (
        <>
          <div className="main-photo-container">
            <div className="main-photo">
              <img src={`${config.cloudfrontURL}/${photo.itemPhoto}`} alt={photo.itemName} />
            </div>
            <div className="main-photo-details">
              <h2>{photo.itemName}</h2>
              <p>{photo.itemDescription}</p>
            </div>
          </div>
          <Masonry className="grid" options={{ isFitWidth: true }}>
            {photos.map((photoInList) => (
              <div key={photoInList.itemId} onClick={updateMainPhoto}>
                <img src={`${config.cloudfrontURL}/${photoInList.itemPhoto}`} alt={photoInList.itemName} />
              </div>
            ))}
          </Masonry>
        </>
      )}
    </div>
  );
};

export default Gallery;
