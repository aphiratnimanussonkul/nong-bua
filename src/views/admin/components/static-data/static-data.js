import React, { useState } from "react";
import {
  TextField,
  CardMedia,
  IconButton,
  Icon,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import "./static-data.scss";
import UploadIcon from "../../../../assets/upload.png";

const StaticData = () => {
  const [iconImage, setIconImage] = useState(null);

  //Table Data
  const createData = (title, amount, icon) => {
    return { title, amount, icon };
  };
  const imageUrl =
    "https://i.ytimg.com/vi/8OcC_b0FJdI/hq720_live.jpg?sqp=CMiM0PkF-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBqafv9DwYFiB4L835jEbGJbZ4qtw";
  const headers = [
    { name: "ลำดับที่", align: "center" },
    { name: "ข้อมูลเกี่ยวกับ", align: "left" },
    { name: "จำนวน", align: "center" },
    { name: "Icon", align: "center" },
    { name: "แก้ไข / ลบ", align: "right" },
  ];
  const rows = [
    createData("Frozen yoghurt", 230, imageUrl),
    createData("Frozen yoghurt", 100, imageUrl),
    createData(" yoghurt", 430, imageUrl),
    createData("Frozen asdadadadad", 5, imageUrl),
  ];

  const handleChooseIconImage = (event) => {
    setIconImage(event.target.files[0]);
  };

  const createUrlImage = () => {
    return URL.createObjectURL(iconImage);
  };

  return (
    <>
      <div className="management-card static-data">
        <div className="row data-detail">
          <div className="col">
            <h3 className="toppick">ข้อมูลเกี่ยวกับ</h3>
            <TextField
              label="ข้อมูลเกี่ยวกับ"
              placeholder="เช่น จำนวนประชากร"
              type="text"
              variant="outlined"
            />
          </div>
          <div className="col">
            <h3 className="toppick">จำนวนข้อมูลทางสถิติ</h3>
            <TextField
              label="จำนวนข้อมูลทางสถิติ"
              placeholder="เช่น 120"
              type="text"
              variant="outlined"
            />
          </div>
        </div>
        <div className="row icon-manage">
          <div className="col">
            <h3 className="toppick">ชื่อ Icon ที่แสดงข้อมูล</h3>
            <TextField
              label="ชื่อ Icon"
              placeholder="เช่น home"
              type="text"
              variant="outlined"
            />
            <p>
              ค้นหาชื่อ Icon{" "}
              <a
                href="https://material.io/resources/icons/?style=baseline"
                target="_blank"
              >
                Material Icon
              </a>
            </p>
          </div>
          <div className="col icon-upload">
            <h3 className="toppick">
              อัพโหลด Icon กรณีไม่สามารถค้นหาชื่อ Icon ได้
            </h3>
            <div className="row">
              <div className="col">
                <input
                  onChange={handleChooseIconImage}
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                />
                <label for="file-upload">
                  <div className="file-selector ">
                    <div className="col">
                      <img src={UploadIcon} alt="" />
                      <p>เลือกรูป Icon ที่ต้องการอัพโหลด</p>
                    </div>
                  </div>
                </label>
              </div>
              {iconImage !== null && iconImage !== undefined ? (
                <div className="col icon-image">
                  <CardMedia image={createUrlImage()}></CardMedia>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="row action-button">
          <Button
            size="small"
            variant="outlined"
            className="brown-yellow-outlined-button"
          >
            ยกเลิก
          </Button>
          <Button
            size="small"
            variant="outlined"
            className="green-solid-button"
          >
            บันทึก
          </Button>
        </div>
      </div>
      <div className="static-data-table management-card">
        <h3 className="toppick">ทำเนียบคณะกรรมการกองทุนหมู่บ้าน</h3>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell align={header.align} key={index}>
                    {header.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">
                    <CardMedia image={row.icon}></CardMedia>
                  </TableCell>
                  <TableCell align="right">
                    <div className="action-buttons">
                      <IconButton>
                        <Icon>create</Icon>
                      </IconButton>
                      <IconButton>
                        <Icon>delete</Icon>
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
export default StaticData;
