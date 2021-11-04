import React from 'react';
import ThumbnailCustom from '../thumbnailCustom/ThumbnailCustom';

const ThumbnailGalleryCustom = (props) => {
  if (
    props.sampleData.drinks !== null &&
    props.sampleData.drinks.length >= 1 &&
    props.sampleData.drinks !== 'None Found'
  ) {
    return (
      <div className="gallery gallery-custom">
        {props.sampleData.drinks.map((e, index) => {
          return <ThumbnailCustom key={index} sampleData={e} />;
        })}
      </div>
    );
  } else {
    return <h2 className="favorites">No cocktails to show!</h2>;
  }
};

export default ThumbnailGalleryCustom;
