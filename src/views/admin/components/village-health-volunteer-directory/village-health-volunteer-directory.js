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
import {
  getVillageHealthVolunteerDirectory,
  updateVillageHealthVolunteer,
  createVillageHealthVolunteer,
  deleteVillageHealthVolunteerById,
} from "../../../../actions/village-health-volunteer";
import {
  getImageUrl,
  getImageFullPathFromUrl,
} from "../../../../helpers/image-url/image-url";
import {
  uploadImages,
  deleteImageUploaded,
} from "../../../../actions/upload-image";
import ConfirmModal from "../../../../components/confirm-modal/confirm-modal";
import Loading from "../../../../components/loading/loading";
const VillageHealthVolunteerDirectory = ({
  dispatch,
  directories,
  isLoading,
}) => {
  const directoryOrders = Array.from(Array(15), (_, i) => i + 1);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const headers = [
    { name: "ลำดับที่", align: "center" },
    { name: "ชื่อ - นามสกุล", align: "left" },
    { name: "ตำแหน่ง", align: "left" },
    { name: "รูปภาพโปรไฟล์", align: "center" },
    { name: "ลำดับการแสดง", align: "center" },
    { name: "แก้ไข / ลบ", align: "right" },
  ];

  const setInitData = () => {
    setPersonalDetail(initDirectory);
    setPersonalDetailToUpdate(null);
    setDirectoryToDelete(null);
    setDirectoryValidate(initDirectoryValidate);
  };

  //Update
  const [personalDetailToUpdate, setPersonalDetailToUpdate] = useState(null);

  //Delete
  const [directoryToDelete, setDirectoryToDelete] = useState(null);

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

  const getAndUpdateDirectoryValidate = () => {
    const titleInvalid = personalDetail.title === "";
    const positionInvalid = personalDetail.position === "";
    const priorityInvalid = personalDetail.priority === null;
    const imageProfileInvalid = personalDetail.imageProfile === null;
    setDirectoryValidate({
      name: titleInvalid,
      position: positionInvalid,
      priority: priorityInvalid,
      imageProfile: imageProfileInvalid,
    });
    return (
      titleInvalid || positionInvalid || priorityInvalid || imageProfileInvalid
    );
  };

  //Handle actions button
  const onClickSaveButton = async () => {
    const directortyInvalid = getAndUpdateDirectoryValidate();
    if (!directortyInvalid) {
      if (personalDetailToUpdate) {
        await updateDirectory();
      } else {
        await createDirectory();
      }
      setInitData();
      dispatch(getVillageHealthVolunteerDirectory());
    }
  };

  const updateDirectory = async () => {
    let imagesUploadedToDelete = [];
    try {
      if (personalDetailToUpdate.imageProfile !== personalDetail.imageProfile) {
        const { imageRefPath, imageUrlUploaded } = await uploadImages(
          [personalDetail.imageProfile],
          "village-health-volunteer-image-profile"
        );
        imagesUploadedToDelete = imageRefPath;
        const { imageProfile, ...others } = personalDetail;
        await updateVillageHealthVolunteer({
          imageProfile: imageUrlUploaded[0],
          ...others,
        });
        deleteImageUploaded([
          getImageFullPathFromUrl(
            personalDetailToUpdate.imageProfile,
            "village-health-volunteer-image-profile"
          ),
        ]);
      } else {
        await updateVillageHealthVolunteer(personalDetail);
      }
    } catch (error) {
      alert("ไม่สามารถแก้ไขข้อมูลสมาชิกได้, กรุณาลองอีกครั้ง");
      deleteImageUploaded(imagesUploadedToDelete);
    }
  };

  const createDirectory = async () => {
    let imagesUploadedToDelete = [];
    try {
      const { imageRefPath, imageUrlUploaded } = await uploadImages(
        [personalDetail.imageProfile],
        "village-health-volunteer-image-profile"
      );
      imagesUploadedToDelete = imageRefPath;
      const { imageProfile, ...others } = personalDetail;
      await createVillageHealthVolunteer({
        ...others,
        imageProfile: imageUrlUploaded[0],
      }).catch(() => {
        alert("ไม่สามารถเพิ่มสมาชิกได้, กรุณาลองอีกครั้ง");
        deleteImageUploaded(imagesUploadedToDelete);
      });
    } catch {
      alert("ไม่สามารถเพิ่มสมาชิกได้, กรุณาลองอีกครั้ง");
      deleteImageUploaded(imagesUploadedToDelete);
    }
  };

  const handleConfirmDelete = async () => {
    setConfirmModalOpen(false);
    try {
      const imageProfilePath = getImageFullPathFromUrl(
        directoryToDelete.imageProfile,
        "village-health-volunteer-image-profile"
      );
      deleteImageUploaded([imageProfilePath]);
      await deleteVillageHealthVolunteerById(directoryToDelete.id);
      setInitData();
      dispatch(getVillageHealthVolunteerDirectory());
    } catch {}
  };
  return (
    <>
      <div className="management-card village-fund-directory">
        <div className="row name-position-sort">
          <div className="col">
            <h3 className="toppick">ชื่อ - นามสกุล</h3>
            <TextField
              error={directoryValidate.name}
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
              error={directoryValidate.position}
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
                error={directoryValidate.priority}
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
            onClick={setInitData}
            size="small"
            variant="outlined"
            className="brown-yellow-outlined-button"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={onClickSaveButton}
            size="small"
            variant="outlined"
            className="green-solid-button"
          >
            บันทึก
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
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
                            setPersonalDetailToUpdate(row);
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
  directories: state.villageHealthVolunteer.directories,
  isLoading: state.villageHealthVolunteer.isLoading,
});
export default connect(mapStateToProps)(VillageHealthVolunteerDirectory);
