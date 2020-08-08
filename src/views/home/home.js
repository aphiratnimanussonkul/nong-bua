import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewsCarousal from "./components/news-carousal/news-carousal.js";
import AboutVillage from "./components/about-village/about-village.js";
import News from "../../components/news/news.js";

import "./home.scss";

import { getNews } from "../../actions/home";

const Home = ({ dispatch, news }) => {
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);
  return (
    <>
      <NewsCarousal recentlyNews={news.slice(0, 5)}></NewsCarousal>
      <div className="content">
        <AboutVillage></AboutVillage>
      </div>
      <News news={news} toppick={"ข่าวและกิจกรรม"}></News>
    </>
  );
};

const mapStateToProps = (state) => ({
  news: state.home.news,
});

export default connect(mapStateToProps)(Home);
