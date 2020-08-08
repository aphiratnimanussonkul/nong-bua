import React from "react";
import "./about-village.scss";
import { CardMedia, Typography } from "@material-ui/core";

const AboutVillage = ({ villageIntroduce }) => {
  return (
    <div className="about-village">
      <h2 className="toppick">{villageIntroduce?.title}</h2>
      <div className="detail">
        <CardMedia image={villageIntroduce?.image}></CardMedia>
        <Typography>{villageIntroduce?.detail}</Typography>
      </div>
    </div>
  );
};

export default AboutVillage;
