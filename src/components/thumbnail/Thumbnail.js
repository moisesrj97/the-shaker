import React from "react";
import { Link } from "react-router-dom";

import "./Thumnail.scss";

const Thumbnail = (props) => {
  return (
    <Link to={"/details/" + props.sampleData.idDrink}>
      <div className="thumbnail">
        <img
          className="thumbnail__img"
          src={props.sampleData.strDrinkThumb}
          alt={props.sampleData.strDrink}
        />
        <p className="thumbnail__img-h2">{props.sampleData.strDrink}</p>
      </div>
    </Link>
  );
};

export default Thumbnail;
