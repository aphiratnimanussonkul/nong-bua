import React, { useState } from "react";

import "./about-village.scss";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  TextareaAutosize,
  CardMedia,
  Button,
  IconButton,
  Icon,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import UploadIcon from "../../../../assets/upload.png";

const AboutVillage = () => {
  const aboutVillageOrders = ["INTRODUCE", ...Array.from(Array(5), (_, i) => i + 1)];
  const [order, setOrder] = useState(null);
  const [image, setImage] = useState();

  const handleChooseFile = (event) => {
    setImage(event.target.files[0]);
  };

  const createUrlImage = () => {
    return URL.createObjectURL(image);
  };

  const createData = (title, content, image) => {
    return { title, content, image };
  };

  const imageUrl =
    "https://i.ytimg.com/vi/8OcC_b0FJdI/hq720_live.jpg?sqp=CMiM0PkF-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBqafv9DwYFiB4L835jEbGJbZ4qtw";

  const rows = [
    createData("Frozen yoghurt", "Mon 03 Jul 2020", imageUrl),
    createData(
      "Frozen yoghurt",
      "         บ้านหนองบัว เป็นหมู่บ้านแยกมาจากบ้านหนองปรือ หมู่ที่ 4 ตำบลโบสถ์ อาเภอพิมาย จังหวัดนครราชสีมา เนื่องจากบ้านหนองปรือเป็นหมู่บ้านขนาดใหญ่ มีอาณาเขต กว้างขวาง มีประชากรอาศัยอยู่หนาแน่น เมื่อปี พ.ศ. 2551 ทางราชการจึงได้ประกาศแยกขึ้นอีก หน่ึงหมู่บ้าน ชื่อหมู่บ้าน “หนองบัว” เกิดจากเดิมเป็นชื่อคุ้มหนองบัวก่อนที่จะมีการแยกหมู่บ้าน และการที่ได้ชื่อคุ้มหนองบัว เพราะว่ามีสระน้ำกลางหมู่บ้านที่อดีตเต็มไปด้วยดอกบัวจานวนมาก จึงมีการเรียกชื่อสระน้าว่าหนองบัว จึงนามาเป็นชื่อเรียกคุ้ม “คุ้มหนองบัว” มีการแต่งตั้ง ผู้ใหญ่บ้านคนแรก คือ นายสัมพันธ์ ฉาบพิมาย ปัจจุบันหมู่บ้านหนองบัว หมู่ที 25 ตำบลโบสถ์ อำเภอพิมาย จังหวัดนครราชสีมา ปัจจุบันมีนางกัญญา กอบพิมาย เป็นผู้ใหญ่บ้าน ",
      imageUrl
    ),
    createData(" yoghurt", "Mon 03 Jul 2020", imageUrl),
    createData("Frozen asdadadadad", "Mon 03 Jul 2020", imageUrl),
  ];

  const headers = [
    { name: "ลำดับที่", align: "center" },
    { name: "หัวข้อข่าว", align: "left" },
    { name: "เนื้อหา", align: "left" },
    { name: "รูปภาพ", align: "center" },
    { name: "แก้ไข / ลบ", align: "right" },
  ];

  const handleOrdersChange = (event) => {
    setOrder(event.target.value);
  };

  return (
    <>
      <div className="management-card about-village-manage">
        <div className="row">
          <div className="col title">
            <h3 className="toppick">หัวข้อข้อมูล</h3>
            <TextField label="หัวข้อข้อมูล" type="text" variant="outlined" />
          </div>

          <div className="col sorting">
            <h3 className="toppick">ลำดับการแสดง</h3>
            <FormControl variant="outlined">
              <Select
                variant="outlined"
                value={order}
                onChange={handleOrdersChange}
              >
                {aboutVillageOrders.map((order) => (
                  <MenuItem key={order} value={order}>
                    {order}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="col content">
            <h3 className="toppick">เนื้อหาข้อมูลเกี่ยวกับหมู่บ้าน</h3>
            <TextareaAutosize rowsMin={5} placeholder="เนื้อหา" />
          </div>
        </div>
        <div className="row">
          <div className="col image">
            <h3 className="toppick">รูปภาพ</h3>
            <input
              onChange={handleChooseFile}
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg"
            />
            <label for="file-upload">
              <div className="file-selector ">
                <div className="col">
                  <img src={UploadIcon} alt="" />
                  <p>เลือกรูปภาพที่ต้องการอัพโหลด</p>
                </div>
              </div>
            </label>
          </div>
          {image !== null && image !== undefined ? (
            <div className="col image-selected">
              <h3 className="toppick">รูปภาพที่เลือก</h3>
              <CardMedia image={createUrlImage()}></CardMedia>
            </div>
          ) : null}
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
      <div className="about-village-table management-card">
        <h3 className="toppick">ข่าวสารทั้งหมด</h3>
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
                  <TableCell align="left">
                    <p>{row.content}</p>
                  </TableCell>
                  <TableCell align="left">
                    <CardMedia image={row.image}></CardMedia>
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

export default AboutVillage;
