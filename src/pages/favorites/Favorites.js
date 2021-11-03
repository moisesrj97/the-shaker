import React, { useContext } from 'react';
import ThumbnailGallery from '../../components/thumbnailGallery/ThumbnailGallery';
import { DataContext } from '../../context/DataContext';
import './Favorites.scss';

const Favorites = () => {
  const { store } = useContext(DataContext);
  return (
    <>
      <ThumbnailGallery
        sampleData={{
          drinks: store.user.fav.filter((e, index) => index >= 1),
        }}
      />
    </>
  );
};

export default Favorites;
