import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ListItemText, List, ListItem, Divider, Icon } from "@material-ui/core";
import NongBuaLogo from "../../assets/nong-bua-logo.png";

import "./side-nav.scss";

const SideNav = () => {
  const history = useHistory();
  const menus = [
    {
      label: "ข่าวสาร",
      link: "/management/news-manage",
      iconName: "assignment",
    },
    {
      label: "ทำเนียบ กองทุน",
      link: "/management/news-information",
      iconName: "people",
    },
    {
      label: "โครงการของกองทุน",
      link: "/management/village-fund",
      iconName: "source",
    },
    {
      label: "ทำเนียบ อสม",
      link: "/management/village-health-volunteer",
      iconName: "people",
    },
    {
      label: "ข้อมูลเชิงสถิติของหมู่บ้าน",
      link: "/management/about-village",
      iconName: "data_usage",
    },
    {
      label: "ข้อมูลทั่วไป",
      link: "/management/about-village",
      iconName: "list_alt",
    },
  ];

  const currentTabMenu = () => {
    return menus.findIndex((menu) => {
      const path = history.location.pathname.split("/")[1];
      return menu.link.includes(path);
    });
  };

  const [value, setValue] = useState(currentTabMenu());

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(menus[newValue].link);
  };

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
                onClick={(event) => handleChange(event, index)}
                className={value === index ? "active" : null}
                button
                key={menu.label}
              >
                <Icon>{menu.iconName}</Icon>
                <ListItemText primary={menu.label} />
              </ListItem>
            </div>
          </>
        ))}
      </List>
    </div>
  );
};

export default SideNav;
