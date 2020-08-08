import React, { useEffect } from "react";
import News from "../../components/news/news";
import { getNews } from "../../actions/home";
import { connect } from "react-redux";

const NewsInformation = ({ dispatch, news }) => {
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return <News news={news} toppick={"ข่าวและกิจกรรม"}></News>;
};
const mapStateToProps = (state) => ({
  news: state.home.news,
});
export default connect(mapStateToProps)(NewsInformation);
