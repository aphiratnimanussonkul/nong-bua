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
import "./village-fund-directory.scss";
import UploadIcon from "../../../../assets/upload.png";
import {
  getVillageFundDireactory,
  createVillageFundDirectory,
} from "../../../../actions/village-fund";
import { connect } from "react-redux";
import { getImageUrl } from "../../../../helpers/image-url/image-url";
import {
  uploadImages,
  deleteImageUploaded,
} from "../../../../actions/upload-image";

const VillageFundDirectory = ({ dispatch, directories }) => {
  const directoryOrders = Array.from(Array(10), (_, i) => i + 1);

  const initDirectory = {
    name: "",
    position: "",
    imageProfile: null,
    priority: 0,
  };
  const [personalDetail, setPersonalDetail] = useState(initDirectory);

  useEffect(() => {
    dispatch(getVillageFundDireactory());
  }, [dispatch]);

  //Table Data
  const headers = [
    { name: "ลำดับที่", align: "center" },
    { name: "ชื่อ - นามสกุล", align: "left" },
    { name: "ตำแหน่ง", align: "left" },
    { name: "รูปภาพโปรไฟล์", align: "center" },
    { name: "ลำดับการแสดง", align: "center" },
    { name: "แก้ไข / ลบ", align: "right" },
  ];

  //Handle input change
  const onNameInputChange = (event) => {
    const { name, ...other } = personalDetail;
    setPersonalDetail({
      name: event.target.value,
      ...other,
    });
  };

  const onPositionInputChange = (event) => {
    const { position, ...other } = personalDetail;
    setPersonalDetail({
      position: event.target.value,
      ...other,
    });
  };

  const handleOrdersChange = (event) => {
    const { priority, ...other } = personalDetail;
    setPersonalDetail({
      priority: event.target.value,
      ...other,
    });
  };

  const handleChooseImageProfile = (event) => {
    const { imageProfile, ...other } = personalDetail;
    setPersonalDetail({
      imageProfile: event.target.files[0],
      ...other,
    });
  };

  //Handle actions button
  const onClickCreateDirectory = async () => {
    let imagesUploadedToDelete = [];
    try {
      const { imageRefPath, imageUrlUploaded } = await uploadImages(
        [personalDetail.imageProfile],
        "village-fund-image-profile"
      );
      imagesUploadedToDelete = imageRefPath;
      const { imageProfile, ...others } = personalDetail;
      await createVillageFundDirectory({
        ...others,
        imageProfile: imageUrlUploaded[0],
      }).then(() => {
        setPersonalDetail(initDirectory);
        dispatch(getVillageFundDireactory());
      });
    } catch {
      deleteImageUploaded(imagesUploadedToDelete);
    }
  };

  return (
    <>
      <div className="management-card village-fund-directory">
        <div className="row name-position-sort">
          <div className="col">
            <h3 className="toppick">ชื่อ - นามสกุล</h3>
            <TextField
              onChange={onNameInputChange}
              label="ชื่อ - นามสกุล"
              type="text"
              variant="outlined"
            />
          </div>
          <div className="col">
            <h3 className="toppick">ตำแหน่ง</h3>
            <TextField
              onChange={onPositionInputChange}
              label="ตำแหน่ง"
              type="text"
              variant="outlined"
            />
          </div>
          <div className="col">
            <h3 className="toppick">ลำดับการแสดง</h3>
            <FormControl variant="outlined">
              <Select
                variant="outlined"
                value={personalDetail.priority}
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
          {personalDetail.imageProfile !== null &&
          personalDetail.imageProfile !== undefined ? (
            <div className="col">
              <h3 className="toppick">ภาพโปรไฟล์ที่เลือก</h3>
              <CardMedia
                image={getImageUrl(personalDetail.imageProfile)}
              ></CardMedia>
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
            onClick={onClickCreateDirectory}
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
              {directories.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.position}</TableCell>
                  <TableCell align="center">
                    <CardMedia image={row.imageProfile} key={index}></CardMedia>
                  </TableCell>
                  <TableCell align="center">{row.priority}</TableCell>
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
  directories: state.villageFund.directories,
});
export default connect(mapStateToProps)(VillageFundDirectory);
