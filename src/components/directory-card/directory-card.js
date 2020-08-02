import React from "react";
import { Card, CardContent, Avatar } from "@material-ui/core";

import "./directory-card.scss";

const DirectoryCard = () => {
  return (
    <Card className="directory-card">
      <CardContent>
        <Avatar src="https://scontent.fbkk20-1.fna.fbcdn.net/v/t1.0-9/52629688_1295604687263387_4952472015299674112_n.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_eui2=AeH7VOKMBAH-JFe0rwb7rYn-u04OAlfpv1O7Tg4CV-m_U0BAgpRzrwQSdU-i8QwvmxpRrqk6B69xGKtzH19aaAj-&_nc_ohc=8WSiVI6PvPMAX945_oS&_nc_ht=scontent.fbkk20-1.fna&oh=6356b09bb68e3fd32aa05af3c0e14ab4&oe=5F4AD06D" />
        <div className="personal-detial">
          <h3 className="toppick">Aphirat Nimanussonkul</h3>
          <p>ประธานกองทุนหมู่บ้าน</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DirectoryCard;
