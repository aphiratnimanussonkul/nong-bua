import React from "react";
import { Card, CardContent, Avatar } from "@material-ui/core";

import "./directory-card.scss";

const DirectoryCard = ({ personalDetail }) => {
  const isMobile = navigator.userAgent.includes("Mobile");
  return (
    <Card className={isMobile ? "directory-card mobile" : "directory-card"}>
      <CardContent>
        <Avatar src={personalDetail.imageProfile} />
        <div className="personal-detial">
          <h3 className="toppick">{personalDetail.name}</h3>
          <p>{personalDetail.position}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DirectoryCard;
