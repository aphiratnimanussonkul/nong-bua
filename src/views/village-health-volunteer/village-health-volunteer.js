import React, { useEffect } from "react";
import News from "../../components/news/news";
import { GridList } from "@material-ui/core";

import "./village-health-volunteer.scss";
import DirectoryCard from "../../components/directory-card/directory-card";
import StaticCard from "./components/static-card/static-card";
import {
  getVillageHealthVolunteerNews,
  getVillageHealthVolunteerDirectory,
} from "../../actions/village-health-volunteer";
import { connect } from "react-redux";

const VillageHealthVolunteer = ({ dispatch, news, directories }) => {
  useEffect(() => {
    dispatch(getVillageHealthVolunteerNews());
    dispatch(getVillageHealthVolunteerDirectory());
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
            <StaticCard
              staticData={{ iconName: "home", unit: "ครัวเรือน", amount: 160 }}
            ></StaticCard>
            <StaticCard
              staticData={{
                iconName: "people",
                unit: "คน",
                amount: 658,
              }}
            ></StaticCard>
            <StaticCard
              staticData={{
                iconUrl:
                  "https://www.clipartkey.com/mpngs/m/225-2250168_man-gender-sex-male-gender-symbol-svg-png.png",
                unit: "ประชากรชาย",
                amount: 253,
              }}
            ></StaticCard>
            <StaticCard
              staticData={{
                iconUrl:
                  "https://www.freeiconspng.com/uploads/female-gender-symbol-icon-16.png",
                unit: "ประชากรหญิง",
                amount: 315,
              }}
            ></StaticCard>
            <StaticCard
              staticData={{
                iconName: "king_bed",
                unit: "ผู้ป่วยติดเตียง",
                amount: 5,
              }}
            ></StaticCard>
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
});

export default connect(mapStateToProps)(VillageHealthVolunteer);
