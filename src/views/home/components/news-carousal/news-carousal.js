import React from "react";
import Carousel from "react-material-ui-carousel";
import { CardMedia } from "@material-ui/core";
import "./news-carousal.scss";

const NewsCarousal = ({ recentlyNews }) => {
  return (
    <Carousel>
      {recentlyNews.map((item) => (
        <CardMedia image={item.images[0]}>
          <div className="news-title">
            <div className="vertical-divider"></div>
            <h3>{item.title}</h3>
          </div>
        </CardMedia>
      ))}
    </Carousel>
  );
};

export default NewsCarousal;
