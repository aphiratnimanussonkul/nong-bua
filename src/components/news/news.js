import React from "react";
import {
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
  GridList,
} from "@material-ui/core";
import "./news.scss";
import NewsCard from "./components/news-card/news-card";

const News = () => {
  const cards = ["assas", "asd", "asdadasd", "asdF"];

  return (
    <div className="news">
      <div className="content">
        <h2 className="toppick">ข่าวและกิจกรรม</h2>
        <GridList>
          {cards.map((card) => {
            return <NewsCard></NewsCard>;
          })}
        </GridList>
      </div>
    </div>
  );
};

export default News;
