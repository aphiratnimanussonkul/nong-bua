import React, { useState, Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withRouter, useHistory } from "react-router-dom";
import "./header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      menus: [
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
      ],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, newValue) => {
    this.state.value = newValue;
    this.props.history.push(this.state.menus[newValue].link);
  };
  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar className="navbar">
            <h1>หมู่บ้านหนองบัว</h1>
            <p>หมู่ที่ 25 ตำบลโบสถ์ อำเภอพิมาย จังหวัดนครราชสีมา</p>
          </Toolbar>
          <Toolbar className="nav-menu-bar">
            <Tabs value={this.state.value} onChange={this.handleChange}>
              {this.state.menus.map((menu) => {
                return <Tab label={menu.label} />;
              })}
            </Tabs>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default withRouter(Header);
