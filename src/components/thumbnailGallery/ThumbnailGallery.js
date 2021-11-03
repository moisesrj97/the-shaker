import React from 'react';
import Thumbnail from '../thumbnail/Thumbnail';
import './ThumbnailGallery.scss';

const ThumbnailGallery = (props) => {
  if (
    props.sampleData.drinks !== null &&
    props.sampleData.drinks.length >= 1 &&
    props.sampleData.drinks !== 'None Found'
  ) {
    return (
      <div className="gallery">
        {props.sampleData.drinks.map((e, index) => {
          return <Thumbnail key={index} sampleData={e} />;
        })}
      </div>
    );
  } else {
    return <h2 className="favorites">No cocktails to show!</h2>;
  }
};

export default ThumbnailGallery;
