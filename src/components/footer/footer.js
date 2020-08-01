import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import CopyrightIcon from "@material-ui/icons/Copyright";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import MapIcon from "@material-ui/icons/Map";
import "./footer.scss";
export default function Footer() {
  return (
    <>
      <div className="footer">
        <h1>ติดต่อเรา</h1>
        <div className="line"></div>
        <div className="contacts">
          <div className="contact-detail">
            <PhoneIcon></PhoneIcon>
            <p>08-0166-9415</p>
          </div>
          <div className="contact-detail">
            <RoomIcon></RoomIcon>
            <p>
              หมู่ที่ 25 ตำโบสถ์ <span>อำเภอพิมาย จังหวัดนครราชสีมา </span>
              <span>30110</span>
            </p>
          </div>
          <div className="contact-detail pointer">
            <MapIcon></MapIcon>
            <p>Google Map</p>
          </div>
        </div>
        <div className="line"></div>
        <div className="copyright">
          <IconButton>
            <CopyrightIcon />
          </IconButton>
          <h2>Aphirat Nimanussonkul</h2>
          <IconButton>
            <MailIcon />
          </IconButton>
          <IconButton>
            <GitHubIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
