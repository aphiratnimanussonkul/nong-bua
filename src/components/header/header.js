import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withRouter, useHistory } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const history = useHistory();
  const [value, setValue] = useState(0);
  const menus = [
    {
      label: "หน้าแรก",
      link: "/",
    },
    {
      label: "ข่าวและกิจกรรม",
      link: "/news-information",
    },
    {
      label: "กองทุนหมู่บ้าน",
      link: "/village-fund",
    },
    {
      label: "อสม",
      link: "/village-health-volunteer",
    },
    {
      label: "เกี่ยวกับหมู่บ้าน",
      link: "/about-village",
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(menus[newValue].link);
  };
  return (
    <>
      <AppBar>
        <Toolbar className="navbar">
          <h1>หมู่บ้านหนองบัว</h1>
          <p>หมู่ที่ 25 ตำบลโบสถ์ อำเภอพิมาย จังหวัดนครราชสีมา</p>
        </Toolbar>
        <Toolbar className="nav-menu-bar">
          <Tabs value={value} onChange={handleChange}>
            {menus.map((menu) => {
              return <Tab label={menu.label} />;
            })}
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withRouter(Header);
