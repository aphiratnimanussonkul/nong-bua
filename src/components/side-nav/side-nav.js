import React from "react";

import "./side-nav.scss";
import { ListItemText, List, ListItem, Divider, Icon } from "@material-ui/core";
import NongBuaLogo from "../../assets/nong-bua-logo.png";
const SideNav = () => {
  const menus = [
    {
      label: "ข่าวสาร",
      link: "/",
      iconName: "assignment",
    },
    {
      label: "ทำเนียบ กองทุน",
      link: "/news-information",
      iconName: "people",
    },
    {
      label: "โครงการของกองทุน",
      link: "/village-fund",
      iconName: "source",
    },
    {
      label: "ทำเนียบ อสม",
      link: "/village-health-volunteer",
      iconName: "people",
    },
    {
      label: "ข้อมูลเชิงสถิติของหมู่บ้าน",
      link: "/about-village",
      iconName: "data_usage",
    },
    {
      label: "ข้อมูลทั่วไป",
      link: "/about-village",
      iconName: "list_alt",
    },
  ];
  return (
    <div className="side-nav">
      <div className="logo">
        <img src={NongBuaLogo} alt="" />
        <h1>Nong Bua</h1>
        <h2>ระบบจัดการข้อมูล</h2>
      </div>

      <List>
        {menus.map((menu, index) => (
          <>
            <div className="list">
              <ListItem
                // onClick={(event) => handleChange(event, index)}
                // className={value === index ? "active" : null}
                button
                key={menu.label}
              >
                <Icon>{menu.iconName}</Icon>
                <ListItemText primary={menu.label} />
              </ListItem>
              {/* {value === index ? <div className="active"
              ></div> : null} */}
            </div>
          </>
        ))}
      </List>
    </div>
  );
};

export default SideNav;
