import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Carousel from "react-material-ui-carousel";
import { CardMedia, Chip, Typography, GridList } from "@material-ui/core";
import NewsCard from "../../components/news/components/news-card/news-card";

import { getNewsById } from "../../actions/read-news";
import { convertHowLong } from "../../helpers/convert-how-long/index";

import "./read-news.scss";

const ReadNews = ({ dispatch, news, newsRelate, newsId }) => {
  const history = useHistory();
  history.listen((location) => {
    if (
      location.pathname.includes("/news-information/") &&
      !location.pathname.includes(newsId)
    ) {
      dispatch(getNewsById(location.pathname.split("/")[2]));
    }
  });
  useEffect(() => {
    dispatch(getNewsById(newsId));
  }, [dispatch]);

  return (
    <div className="read-news">
      <div className="content">
        <div className="news-detail">
          <h2 className="toppick">{news?.title}</h2>
          {news?.images.length ? (
            <Carousel>
              {news?.images.map((image) => (
                <CardMedia image={image}></CardMedia>
              ))}
            </Carousel>
          ) : null}

          <div className="top-card-news">
            <div className="tags">
              {news?.tags.map((tag) => {
                return <Chip label={tag} size="small" className="chip" />;
              })}
            </div>
            <Typography variant="subtitle2" className="how-long">
              {convertHowLong(news?.createdAt.seconds)}
            </Typography>
          </div>
          <Typography variant="h6" color="textSecondary">
            {news?.description}
          </Typography>
        </div>
        <div className="more-news-relate">
          <h2 className="toppick">ข่าวและกิจกรรมที่เกี่ยวข้อง</h2>
          <GridList>
            {newsRelate.map((detail) => {
              return <NewsCard detail={detail}></NewsCard>;
            })}
          </GridList>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  news: state.readNews.news,
  newsRelate: state.readNews.newsRelate,
  newsId: ownProps.match.params.id,
});

export default connect(mapStateToProps)(ReadNews);
