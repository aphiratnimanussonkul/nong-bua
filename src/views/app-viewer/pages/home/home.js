import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewsCarousal from "./components/news-carousal/news-carousal.js";
import AboutVillage from "./components/about-village/about-village.js";
import News from "../../../../components/news/news";

import "./home.scss";

import { getNews, getVillageIntroduce } from "../../../../actions/home";

const Home = ({ dispatch, news, villageIntroduce }) => {
  useEffect(() => {
    dispatch(getNews());
    dispatch(getVillageIntroduce());
  }, [dispatch]);
  return (
    <>
      <NewsCarousal recentlyNews={news.slice(0, 5)}></NewsCarousal>
      <div className="content">
        <AboutVillage villageIntroduce={villageIntroduce}></AboutVillage>
      </div>
      <News news={news} toppick={"ข่าวและกิจกรรม"}></News>
    </>
  );
};

const mapStateToProps = (state) => ({
  news: state.home.news,
  villageIntroduce: state.home.villageIntroduce,
});

export default connect(mapStateToProps)(Home);
