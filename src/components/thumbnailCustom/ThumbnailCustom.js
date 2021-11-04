import React from 'react';
import { Link } from 'react-router-dom';

const Thumbnail = (props) => {
  return (
    <Link to={'/details-custom/' + props.sampleData.id}>
      <div className="thumbnail">
        <img
          className="thumbnail__img"
          src={props.sampleData.strDrinkThumb || props.sampleData.thumb}
          alt={props.sampleData.strDrink || props.sampleData.name}
        />
        <p className="thumbnail__img-h2">
          {props.sampleData.strDrink || props.sampleData.name}
        </p>
      </div>
    </Link>
  );
};

export default Thumbnail;
