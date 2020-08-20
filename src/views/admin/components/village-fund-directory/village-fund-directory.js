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
  getVillageFundDirectory,
  createVillageFundDirectory,
  deleteDirectoryById,
} from "../../../../actions/village-fund";
import Loading from "../../../../components/loading/loading";
import { connect } from "react-redux";
import {
  getImageUrl,
  getImageFullPathFromUrl,
} from "../../../../helpers/image-url/image-url";
import {
  uploadImages,
  deleteImageUploaded,
} from "../../../../actions/upload-image";
import ConfirmModal from "../../../../components/confirm-modal/confirm-modal";

const VillageFundDirectory = ({ dispatch, directories, isLoading }) => {
  const directoryOrders = Array.from(Array(10), (_, i) => i + 1);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  //Delete
  const [directoryToDelete, setDirectoryToDelete] = useState(null);
  const initDirectory = {
    name: "",
    position: "",
    imageProfile: null,
    priority: 0,
  };
  const [personalDetail, setPersonalDetail] = useState(initDirectory);

  useEffect(() => {
    dispatch(getVillageFundDirectory());
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
        dispatch(getVillageFundDirectory());
      });
    } catch {
      deleteImageUploaded(imagesUploadedToDelete);
    }
  };

  const handleConfirmDelete = async () => {
    setConfirmModalOpen(false);
    const imageProfilePath = getImageFullPathFromUrl(
      directoryToDelete.imageProfile,
      "village-fund-image-profile"
    );
    deleteImageUploaded([imageProfilePath]);
    await deleteDirectoryById(directoryToDelete.id);
    setPersonalDetail(initDirectory);
    dispatch(getVillageFundDirectory());
  };

  return (
    <>
      <div className="management-card village-fund-directory">
        <div className="row name-position-sort">
          <div className="col">
            <h3 className="toppick">ชื่อ - นามสกุล</h3>
            <TextField
              value={personalDetail.name}
              onChange={onNameInputChange}
              label="ชื่อ - นามสกุล"
              type="text"
              variant="outlined"
            />
          </div>
          <div className="col">
            <h3 className="toppick">ตำแหน่ง</h3>
            <TextField
              value={personalDetail.position}
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
      {isLoading ? (
        <Loading></Loading>
      ) : (
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
                    {console.log(personalDetail)}
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.position}</TableCell>
                    <TableCell align="center">
                      <CardMedia
                        image={row.imageProfile}
                        key={index}
                      ></CardMedia>
                    </TableCell>
                    <TableCell align="center">{row.priority}</TableCell>
                    <TableCell align="right">
                      <div className="action-buttons">
                        <IconButton
                          onClick={() => {
                            setPersonalDetail(row);
                          }}
                        >
                          <Icon>create</Icon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setDirectoryToDelete(row);
                            setConfirmModalOpen(true);
                          }}
                        >
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
      )}
      {confirmModalOpen ? (
        <ConfirmModal
          onCancel={() => setConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="คุณต้องการลบสมาชิกท่านนี้ ใช่ หรือ ไม่"
          descrption={[
            {
              title: "ชื่อ",
              detail: directoryToDelete.name,
            },
            {
              title: "ตำแหน่ง",
              detail: directoryToDelete.position,
            },
          ]}
        ></ConfirmModal>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  directories: state.villageFund.directories,
  isLoading: state.villageFund.isLoading,
});
export default connect(mapStateToProps)(VillageFundDirectory);
