import React, { useContext } from 'react';
import ThumbnailGallery from '../../components/thumbnailGallery/ThumbnailGallery';
import { DataContext } from '../../context/DataContext';
import './Favorites.scss';

const Favorites = () => {
  const { store } = useContext(DataContext);
  if (store.user.fav.length < 2) {
    return (
      <div>
        <p className="favorites">No cocktails to show!</p>
      </div>
    );
  } else
    return (
      <div>
        <ThumbnailGallery
          sampleData={{
            drinks: store.user.fav.filter((e, index) => index >= 1),
          }}
        />
      </div>
    );
};

export default Favorites;
