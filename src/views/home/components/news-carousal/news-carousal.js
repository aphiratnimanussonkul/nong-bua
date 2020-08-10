import React from "react";
import Carousel from "react-material-ui-carousel";
import { CardMedia } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import "./news-carousal.scss";

const NewsCarousal = ({ recentlyNews }) => {
  const history = useHistory();
  const readNews = (newsId) => {
    history.push(`/news-information/${newsId}`);
  };
  return (
    <Carousel>
      {recentlyNews.map((item) => (
        <CardMedia image={item.images[0]} onClick={() => readNews(item.id)}>
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
