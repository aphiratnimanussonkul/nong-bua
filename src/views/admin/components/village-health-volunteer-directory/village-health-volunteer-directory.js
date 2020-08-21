import React, { useState, useEffect } from "react";
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
import "./village-health-volunteer-directory.scss";
import UploadIcon from "../../../../assets/upload.png";
import { connect } from "react-redux";
import { getVillageHealthVolunteerDirectory } from "../../../../actions/village-health-volunteer";
const VillageHealthVolunteerDirectory = ({ dispatch, directories }) => {
  const directoryOrders = Array.from(Array(15), (_, i) => i + 1);
  const headers = [
    { name: "ลำดับที่", align: "center" },
    { name: "ชื่อ - นามสกุล", align: "left" },
    { name: "ตำแหน่ง", align: "left" },
    { name: "รูปภาพโปรไฟล์", align: "center" },
    { name: "แก้ไข / ลบ", align: "right" },
  ];

  const initDirectory = {
    name: "",
    position: "",
    imageProfile: null,
    priority: null,
  };
  const [personalDetail, setPersonalDetail] = useState(initDirectory);

  const initDirectoryValidate = {
    name: false,
    position: false,
    priority: false,
    imageProfile: false,
  };
  const [directoryValidate, setDirectoryValidate] = useState(
    initDirectoryValidate
  );

  useEffect(() => {
    dispatch(getVillageHealthVolunteerDirectory());
  }, [dispatch]);

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
                value={personalDetail.priority}
                // onChange={handleOrdersChange}
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
              // onChange={handleChooseImageProfile}
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
          {/* {imageProfile !== null && imageProfile !== undefined ? (
            <div className="col">
              <h3 className="toppick">ภาพโปรไฟล์ที่เลือก</h3>
              <CardMedia image={createUrlImage()}></CardMedia>
            </div>
          ) : null} */}
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
        <h3 className="toppick">
          ทำเนียมอาสาสมัครสาธารณสุขประจำหมู่บ้านหนองบัว
        </h3>
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
              {directories.map((row, index) => (
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

const mapStateToProps = (state) => ({
  directories: state.villageHealthVolunteer.directories,
});
export default connect(mapStateToProps)(VillageHealthVolunteerDirectory);
