import React, { FunctionComponent } from "react";
import { IImage } from "../../models/image";
import "./Card.css";

type OwnProps = {
  image: IImage;
};

const API_URL = "http://localhost:4000/api/images";

const Card: FunctionComponent<OwnProps> = ({ image }) => {
  const { src, alt } = image;
  return (
    <div className="container-card">
      <img src={`${API_URL}/${src}`} alt={alt} />
    </div>
  );
};

export default Card;
