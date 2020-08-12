import React, { useEffect } from "react";
import News from "../../components/news/news";
import DirectoryCard from "../../components/directory-card/directory-card";
import ProjectCard from "./components/project-card/project-card";
import { GridList } from "@material-ui/core";
import { connect } from "react-redux";

import {
  getVillageFundDireactory,
  getVillageProject,
  getVillageNewsInformation,
} from "../../actions/village-fund";

import "./village-fund.scss";

const VillageFund = ({ dispatch, directories, projects, newsInformation }) => {
  useEffect(() => {
    dispatch(getVillageFundDireactory());
    dispatch(getVillageProject());
    dispatch(getVillageNewsInformation());
  }, [dispatch]);

  return (
    <>
      <div className="directory">
        <div className="content">
          <h2 className="toppick">ทำเนียบคณะกรรมการกองทุนหมู่บ้าน</h2>
          <GridList>
            {directories.map((directoryCard, index) => (
              <DirectoryCard
                personalDetail={directoryCard}
                key={index}
              ></DirectoryCard>
            ))}
          </GridList>
        </div>
      </div>
      <div className="project-list">
        <div className="content">
          <h2 className="toppick">โครงการของกองทุนหมู่บ้าน</h2>
          {projects.map((project, index) => (
            <ProjectCard projectName={project.name} key={index}></ProjectCard>
          ))}
        </div>
      </div>
      <News
        news={newsInformation}
        toppick={"ข่าวและกิจกรรมของกองทุนหมู่บ้าน"}
      ></News>
    </>
  );
};

const mapStateToProps = (state) => ({
  directories: state.villageFund.directories,
  projects: state.villageFund.projects,
  newsInformation: state.villageFund.newsInformation,
});

export default connect(mapStateToProps)(VillageFund);
