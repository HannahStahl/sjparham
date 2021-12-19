import fetch from 'node-fetch';
import sanityClient from '@sanity/client';

const apiUrl = 'https://hntqppr7a3.execute-api.us-east-1.amazonaws.com/prod';
const client = sanityClient({
  projectId: 'kpu3h10o',
  dataset: 'production',
  apiVersion: '2021-10-03',
  token: 'TODO', // starts with skk
  useCdn: false,
});

const clearContent = async () => {
  const sanityItems = await client.fetch('*[_type == "items"]');
  const sanityCategories = await client.fetch('*[_type == "category"]');
  const sanityPhotos = await client.fetch('*[_type == "photo"]');

  const sanityDocuments = [
    ...sanityItems,
    ...sanityCategories,
    ...sanityPhotos,
  ];

  for (const document of sanityDocuments) {
    await client.delete(document._id);
  }
};

const populateContent = async () => {
  const categories = await fetch(`${apiUrl}/categories`).then((res) => res.json());
  const photos = await fetch(`${apiUrl}/photos`).then((res) => res.json());

  const sortedCategories = categories.sort((a, b) => a.categoryRank - b.categoryRank);

  const populatePhotoContent = async (photo) => {
    const { photoId } = photo;

    await client.createOrReplace({
      _type: 'photo',
      _id: id, // TODO prepend with 'drafts.' if it's a draft photo
      // TODO add other fields
    });
    
    return {
      _type: 'reference',
      _ref: id,
      _key: id,
    };
  };

  const populateCategoryContent = async (category) => {
    const { categoryId } = category;

    const photosInThisCategory = photos.filter((photo) => photo.categoryId === categoryId);
    const photosContent = [];
    for (const photo of photosInThisCategory) {
      const photoContent = await populatePhotoContent(photo);
      photosContent.push(photoContent);
    }

    await client.createOrReplace({
      _type: 'category',
      _id: id, // TODO prepend with 'drafts.' if it's a draft category
      // TODO add other fields
      photos: photosContent,
    });

    return {
      _type: 'reference',
      _ref: id,
      _key: id,
    };
  };

  await clearContent();

  const categoriesContent = [];
  for (const category of sortedCategories) {
    const categoryContent = await populateCategoryContent(category);
    categoriesContent.push(categoryContent);
  }

  await client.createOrReplace({
    _type: 'categories',
    _id: 'categories',
    categories: categoriesContent,
  });
};

populateContent().then(() => console.log('Done populating content!'));
