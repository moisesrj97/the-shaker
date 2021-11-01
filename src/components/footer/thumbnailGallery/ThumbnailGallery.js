import React from 'react';
import Thumbnail from '../../thumbnail/Thumbnail';

const ThumbnailGallery = (props) => {
  return (
    <div>
      <h1>Thumbnail Gallery</h1>
      <Thumbnail sampleData={props.sampleData.drinks[0]} />
    </div>
  );
};

export default ThumbnailGallery;
