import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import CopyrightIcon from "@material-ui/icons/Copyright";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import MapIcon from "@material-ui/icons/Map";
import "./footer.scss";
import { Tooltip } from "@material-ui/core";
export default function Footer() {
  const isMobile = navigator.userAgent.includes("Mobile");
  const handleActionClick = (menu) => {
    switch (menu) {
      case "GOOGLE_MAP":
        window.open(
          "https://www.google.com/maps/place/15%C2%B015'29.3%22N+102%C2%B037'04.2%22E/@15.2581442,102.6169093,581m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d15.2581424!4d102.6178196",
          "_blank"
        );
        break;
      case "GITHUB":
        window.open(
          "https://github.com/aphiratnimanussonkul?tab=repositories",
          "_blank"
        );
        break;
      case "MAIL":
        navigator.clipboard.writeText("B5923151@gmail.com");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="footer">
        <h1>ติดต่อเรา</h1>
        <div className="line"></div>
        <div className={isMobile ? "contacts mobile" : "contacts"}>
          <div className="contact-detail">
            <PhoneIcon></PhoneIcon>
            <p>08-0166-9415</p>
          </div>
          <div className="contact-detail">
            <RoomIcon></RoomIcon>
            <p>
              หมู่ที่ 25 ตำโบสถ์{" "}
              {isMobile ? (
                <>
                  <span>อำเภอพิมาย </span>
                  <span> จังหวัดนครราชสีมา </span>
                </>
              ) : (
                <span>อำเภอพิมาย จังหวัดนครราชสีมา </span>
              )}
              <span>30110</span>
            </p>
          </div>
          <div
            className="contact-detail pointer"
            onClick={() => handleActionClick("GOOGLE_MAP")}
          >
            <MapIcon></MapIcon>
            <p>Google Map</p>
          </div>
        </div>
        <div className="line"></div>
        <div className={isMobile ? "copyright mobile" : "copyright"}>
          <CopyrightIcon />
          <h2>Aphirat Nimanussonkul</h2>
          <Tooltip
            title="Click to copy B5923151@gmail.com"
            onClick={() => handleActionClick("MAIL")}
          >
            <IconButton id="mail">
              <MailIcon />
            </IconButton>
          </Tooltip>
          <IconButton onClick={() => handleActionClick("GITHUB")}>
            <GitHubIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
