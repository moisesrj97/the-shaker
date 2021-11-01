import React from "react";

import "./Thumnail.scss";

const Thumbnail = (props) => {
  return (
    <div className="thumbnail">
      <img
        className="thumbnail__img"
        src={props.sampleData.strDrinkThumb}
        alt={props.sampleData.strDrink}
      />
      <p className="thumbnail__img-h2">{props.sampleData.strDrink}</p>
    </div>
  );
};

export default Thumbnail;
