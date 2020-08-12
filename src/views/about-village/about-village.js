import React, { useEffect } from "react";
import InformationCard from "./information-card/information-card";
import { connect } from "react-redux";

import "./about-village.scss";
import { getAboutVillage } from "../../actions/about-village";

const AboutVillage = ({ dispatch, aboutVillages }) => {
  useEffect(() => {
    dispatch(getAboutVillage());
  }, [dispatch]);

  return (
    <div className="about-village">
      {aboutVillages.map((aboutVillage, index) => {
        return <InformationCard information={aboutVillage} key={index}></InformationCard>;
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  aboutVillages: state.aboutVillage.aboutVillage,
});

export default connect(mapStateToProps)(AboutVillage);
