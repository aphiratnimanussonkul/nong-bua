import React from "react";

import "./static-card.scss";
import { Card, CardContent, Icon } from "@material-ui/core";

const StaticCard = ({ staticData }) => {
  return (
    <Card className="static-card">
      <CardContent>
        {staticData.iconName ? (
          <Icon>{staticData.iconName}</Icon>
        ) : (
          <img src={staticData.iconUrl} />
        )}
        <h1>{staticData?.amount}</h1>
        <h4>{staticData?.unit}</h4>
      </CardContent>
    </Card>
  );
};

export default StaticCard;
