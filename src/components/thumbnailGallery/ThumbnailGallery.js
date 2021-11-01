import React from "react";
import { Link } from "react-router-dom";
import Thumbnail from "../thumbnail/Thumbnail";
import "./ThumbnailGallery.scss";

const ThumbnailGallery = (props) => {
  return (
    <div className="gallery">
      {props.sampleData.drinks.map((e, index) => {
        return <Thumbnail key={index} sampleData={e} />;
      })}
    </div>
  );
};

export default ThumbnailGallery;
