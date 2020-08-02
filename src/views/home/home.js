import React from "react";
import NewsCarousal from "./components/news-carousal/news-carousal.js";
import AboutVillage from "./components/about-village/about-village.js";
import "./home.scss";
import News from "../../components/news/news.js";

const Home = ({}) => {
  return (
    <>
      <NewsCarousal></NewsCarousal>
      <div className="content">
        <AboutVillage></AboutVillage>
      </div>
      <News></News>
    </>
  );
};

export default Home;
