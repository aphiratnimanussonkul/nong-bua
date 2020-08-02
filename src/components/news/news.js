import React from "react";
import { GridList } from "@material-ui/core";
import "./news.scss";
import NewsCard from "./components/news-card/news-card";

const News = ({ news }) => {
  console.log(news);
  return (
    <div className="news">
      <div className="content">
        <h2 className="toppick">ข่าวและกิจกรรม</h2>
        <GridList>
          {news.map((detail) => {
            return <NewsCard detail={detail}></NewsCard>;
          })}
        </GridList>
      </div>
    </div>
  );
};

export default News;
