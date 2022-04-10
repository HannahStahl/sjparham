import fetch from 'node-fetch';
import sanityClient from '@sanity/client';

const apiUrl = 'https://lbe...'; // Fetch this from Seed
const userId = 'us-east-1:c48...'; // Fetch this from AWS
const cloudfrontUrl = `https://d1esxin5o90ebg.cloudfront.net/${userId}`;
const client = sanityClient({
  projectId: '4dw...', // Fetch this from Sanity
  dataset: 'production',
  apiVersion: '2021-10-03',
  token: 'skj...', // Fetch this from Notes
  useCdn: false,
});

const clearContent = async () => {
  console.log('Deleting existing content');
  const sanityGalleries = await client.fetch('*[_type == "gallery"]');
  const sanityPhotos = await client.fetch('*[_type == "photo"]');

  const sanityDocuments = [...sanityGalleries, ...sanityPhotos];

  for (const document of sanityDocuments) {
    await client.delete(document._id);
  }
};

const uploadImage = async (fileName) => {
  const image = await fetch(`${cloudfrontUrl}/${fileName}`);
  const imageBuffer = await image.arrayBuffer();
  const imageData = Buffer.from(imageBuffer, 'binary');
  return await client.assets.upload(
    'image',
    imageData,
    { filename: fileName.substring(fileName.indexOf('-') + 1, fileName.lastIndexOf('.')) }
  );
};

const populateContent = async () => {
  const categories = await fetch(`${apiUrl}/publishedCategories/${userId}`).then((res) => res.json());
  const items = await fetch(`${apiUrl}/publishedItems/${userId}`).then((res) => res.json());
  const itemsToPhotos = await fetch(`${apiUrl}/itemsToPhotos/${userId}`).then((res) => res.json());
  const photos = await fetch(`${apiUrl}/photos/${userId}`).then((res) => res.json());

  const sortedCategories = categories.sort((a, b) => b.categoryRank - a.categoryRank);

  const populatePhotoContent = async (item) => {
    const { itemDescription, itemId, itemName } = item;
    console.log(`Processing item ${itemName}`);

    const joinRecord = itemsToPhotos.find((itemToPhoto) => itemToPhoto.itemId === itemId);
    const photo = photos.find(({ photoId }) => joinRecord.photoId === photoId);

    const image = await uploadImage(photo.photoName);

    const photoContent = await client.createOrReplace({
      _type: 'photo',
      _id: itemId,
      _key: itemId,
      title: itemName,
      description: itemDescription,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: image._id,
        },
      },
    });

    return photoContent;
  };

  const populateCategoryContent = async (category) => {
    const { categoryId, categoryName, categoryPhoto } = category;
    console.log(`Processing category ${categoryName}`);

    const previewImage = await uploadImage(categoryPhoto);

    const itemsInThisCategory = items.filter((photo) => photo.categoryId === categoryId);
    const sortedItems = itemsInThisCategory.sort((a, b) => a.itemRank - b.itemRank);
    const photosContent = [];
    for (const item of sortedItems) {
      const photoContent = await populatePhotoContent(item);
      photosContent.push(photoContent);
    }

    await client.createOrReplace({
      _type: 'gallery',
      _id: categoryId,
      name: categoryName,
      previewPhoto: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: previewImage._id,
        },
      },
      photos: photosContent,
    });
  };

  await clearContent();

  for (const category of sortedCategories) {
    await populateCategoryContent(category);
  }
};

populateContent().then(() => console.log('Done populating content!'));
