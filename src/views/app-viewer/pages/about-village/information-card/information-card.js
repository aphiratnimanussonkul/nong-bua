import React from "react";
import { CardMedia } from "@material-ui/core";

import "./information-card.scss";

const InformationCard = ({ information }) => {
  return (
    <div className="information-card">
      <div className="content">
        <h2 className="toppick">{information.title}</h2>
        <p>{information.detail}</p>
        <CardMedia image={information.image} />
      </div>
    </div>
  );
};

export default InformationCard;
