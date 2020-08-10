import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import {
  IconButton,
  Toolbar,
  AppBar,
  Tabs,
  Tab,
  SwipeableDrawer,
  ListItem,
  List,
  ListItemText,
  Divider,
} from "@material-ui/core";
import "./header.scss";

const Header = () => {
  const isMobile = navigator.userAgent.includes("Mobile");
  const history = useHistory();
  const [sideMenu, setSideMenu] = useState(false);
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
    <>
      <AppBar>
        <Toolbar className="navbar">
          <h1>หมู่บ้านหนองบัว</h1>
          <p>หมู่ที่ 25 ตำบลโบสถ์ อำเภอพิมาย จังหวัดนครราชสีมา</p>
        </Toolbar>
        <Toolbar className="nav-menu-bar">
          {isMobile ? (
            <IconButton
              aria-label="Menu"
              component="span"
              onClick={() => setSideMenu(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Tabs value={value} onChange={handleChange}>
              {menus.map((menu) => {
                return <Tab label={menu.label} />;
              })}
            </Tabs>
          )}
        </Toolbar>
        <SwipeableDrawer
          anchor="left"
          open={sideMenu}
          onClose={() => setSideMenu(false)}
          onOpen={() => setSideMenu(true)}
        >
          <div
            role="presentation"
            onClick={() => setSideMenu(false)}
            onKeyDown={() => setSideMenu(false)}
          >
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
                      <ListItemText primary={menu.label} />
                    </ListItem>
                    {value === index ? <div className="active"></div> : null}
                  </div>
                  <Divider />
                </>
              ))}
            </List>
          </div>
        </SwipeableDrawer>
      </AppBar>
    </>
  );
};

export default withRouter(Header);
