import React from "react";
import "./about-village.scss";
import { CardMedia, Typography } from "@material-ui/core";

const AboutVillage = ({ villageIntroduce }) => {
  const isMobile = navigator.userAgent.includes("Mobile");
  return (
    <div className="about-village">
      <h2 className="toppick">{villageIntroduce?.title}</h2>
      <div className={isMobile ? "mobile detail" : "detail"}>
        <CardMedia image={villageIntroduce?.image}></CardMedia>
        <Typography>{villageIntroduce?.detail}</Typography>
      </div>
    </div>
  );
};

export default AboutVillage;
