import React, { useEffect } from "react";
import News from "../../components/news/news";
import { GridList } from "@material-ui/core";

import "./village-health-volunteer.scss";
import DirectoryCard from "../../components/directory-card/directory-card";
import StaticCard from "./components/static-card/static-card";
import {
  getVillageHealthVolunteerNews,
  getVillageHealthVolunteerDirectory,
  getVillageStatic,
} from "../../actions/village-health-volunteer";
import { connect } from "react-redux";

const VillageHealthVolunteer = ({
  dispatch,
  news,
  directories,
  villageStatics,
}) => {
  useEffect(() => {
    dispatch(getVillageHealthVolunteerNews());
    dispatch(getVillageHealthVolunteerDirectory());
    dispatch(getVillageStatic());
  }, [dispatch]);

  return (
    <div className="village-health-volunteer">
      <div className="directory">
        <div className="content">
          <h2 className="toppick">
            ทำเนียบอาสาสมัคร สาธารณสุขประจำหมู่บ้าน บ้านหนองบัว
          </h2>
          <GridList>
            {directories.map((directory) => (
              <DirectoryCard personalDetail={directory}></DirectoryCard>
            ))}
          </GridList>
        </div>
      </div>
      <div className="village-information">
        <div className="content">
          <h2 className="toppick">ข้อมูลสาธารณสุขทั่วไปของหมู่บ้าน</h2>
          <GridList className="static-list">
            {villageStatics.map((staticData) => (
              <StaticCard staticData={staticData}></StaticCard>
            ))}
          </GridList>
        </div>
      </div>
      <News news={news} toppick={"ข่าวและกิจกรรมของอสม"}></News>
    </div>
  );
};

const mapStateToProps = (state) => ({
  news: state.villageHealthVolunteer.news,
  directories: state.villageHealthVolunteer.directories,
  villageStatics: state.villageHealthVolunteer.villageStatics,
});

export default connect(mapStateToProps)(VillageHealthVolunteer);
