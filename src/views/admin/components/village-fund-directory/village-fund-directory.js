import React, { useState } from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
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
import "./village-fund-directory.scss";
import UploadIcon from "../../../../assets/upload.png";

const VillageFundDirectory = () => {
  const directoryOrders = Array.from(Array(10), (_, i) => i + 1);
  const [order, setOrder] = useState(null);
  const [imageProfile, setImageProfile] = useState(null);

  //Table Data
  const createData = (name, position, imageProfile) => {
    return { name, position, imageProfile };
  };
  const imageUrl =
    "https://i.ytimg.com/vi/8OcC_b0FJdI/hq720_live.jpg?sqp=CMiM0PkF-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBqafv9DwYFiB4L835jEbGJbZ4qtw";
  const headers = [
    { name: "ลำดับที่", align: "center" },
    { name: "ชื่อ - นามสกุล", align: "left" },
    { name: "ตำแหน่ง", align: "left" },
    { name: "รูปภาพโปรไฟล์", align: "center" },
    { name: "แก้ไข / ลบ", align: "right" },
  ];
  const rows = [
    createData("Frozen yoghurt", "Mon 03 Jul 2020", imageUrl),
    createData("Frozen yoghurt", "Mon 03 Jul 2020", imageUrl),
    createData(" yoghurt", "Mon 03 Jul 2020", imageUrl),
    createData("Frozen asdadadadad", "Mon 03 Jul 2020", imageUrl),
  ];

  const handleOrdersChange = (event) => {
    setOrder(event.target.value);
  };

  const handleChooseImageProfile = (event) => {
    setImageProfile(event.target.files[0]);
  };

  const createUrlImage = () => {
    return URL.createObjectURL(imageProfile);
  };

  return (
    <>
      <div className="management-card village-fund-directory">
        <div className="row name-position-sort">
          <div className="col">
            <h3 className="toppick">ชื่อ - นามสกุล</h3>
            <TextField label="ชื่อ - นามสกุล" type="text" variant="outlined" />
          </div>
          <div className="col">
            <h3 className="toppick">ตำแหน่ง</h3>
            <TextField label="ตำแหน่ง" type="text" variant="outlined" />
          </div>
          <div className="col">
            <h3 className="toppick">ลำดับการแสดง</h3>
            <FormControl variant="outlined">
              <Select
                variant="outlined"
                value={order}
                onChange={handleOrdersChange}
              >
                {directoryOrders.map((order) => (
                  <MenuItem key={order} value={order}>
                    {order}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row image-profile">
          <div className="col">
            <h3 className="toppick">ภาพโปรไฟล์</h3>
            <input
              onChange={handleChooseImageProfile}
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg"
            />
            <label for="file-upload">
              <div className="file-selector ">
                <div className="col">
                  <img src={UploadIcon} alt="" />
                  <p>เลือกรูปภาพโปรไฟล์</p>
                </div>
              </div>
            </label>
          </div>
          {imageProfile !== null && imageProfile !== undefined ? (
            <div className="col">
              <h3 className="toppick">ภาพโปรไฟล์ที่เลือก</h3>
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
      <div className="village-fund-directory-table management-card">
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
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.position}</TableCell>
                  <TableCell align="center">
                    <CardMedia image={row.imageProfile} key={index}></CardMedia>
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
export default VillageFundDirectory;
