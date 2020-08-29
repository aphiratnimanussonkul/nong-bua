import React, { useState, useEffect } from "react";
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
import {
  getVillageStatic,
  updateVillageStaticById,
  createVillageStatic,
  deleteVillageStaticById,
} from "../../../../actions/village-health-volunteer";
import {
  deleteImageUploaded,
  uploadImages,
} from "../../../../actions/upload-image";
import {
  getImageFullPathFromUrl,
  getImageUrl,
  isImageOnServer,
} from "../../../../helpers/image-url/image-url";
import Loading from "../../../../components/loading/loading";
import ConfirmModal from "../../../../components/confirm-modal/confirm-modal";
import { connect } from "react-redux";

const StaticData = ({ dispatch, villageStatics, isLoading }) => {
  const headers = [
    { name: "ลำดับที่", align: "center" },
    { name: "ข้อมูลเกี่ยวกับ", align: "left" },
    { name: "จำนวน", align: "center" },
    { name: "Icon", align: "center" },
    { name: "แก้ไข / ลบ", align: "right" },
  ];
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const initVillageStaticValidate = {
    unit: false,
    amount: false,
    icon: false,
  };
  const [villageStaticValidate, setDirectoryValidate] = useState(
    initVillageStaticValidate
  );

  const setInitData = () => {
    setVillageStatic(initVillageStatic);
    setVillageStaticToDelete(null);
    setVillageStaticToUpdate(null);
    setDirectoryValidate(initVillageStaticValidate);
  };

  //Update
  const [villageStaticToUpdate, setVillageStaticToUpdate] = useState(null);

  //Delete
  const [villageStaticToDelete, setVillageStaticToDelete] = useState(null);
  const initVillageStatic = {
    unit: "",
    amount: "",
    iconName: "",
    iconUrl: null,
  };
  const [villageStatic, setVillageStatic] = useState(initVillageStatic);

  useEffect(() => {
    dispatch(getVillageStatic());
  }, [dispatch]);

  //Handle input change
  const onUitInputChange = (event) => {
    const { unit, ...other } = villageStatic;
    setVillageStatic({
      unit: event.target.value,
      ...other,
    });
  };

  const onAmountInputChange = (event) => {
    const { amount, ...other } = villageStatic;
    setVillageStatic({
      amount: event.target.value,
      ...other,
    });
  };

  const onIconNameInputChange = (event) => {
    const { iconName, ...other } = villageStatic;
    setVillageStatic({
      iconName: event.target.value,
      ...other,
    });
  };

  const handleChooseImageIcon = (event) => {
    const { iconUrl, ...other } = villageStatic;
    setVillageStatic({
      iconUrl: event.target.files[0],
      ...other,
    });
  };

  const getAndUpdateVillageStaticValidate = () => {
    const unitInvalid = villageStatic.unit === "";
    const amountInvalid = villageStatic.amount === "";
    const iconInvalid =
      (villageStatic.iconName === "" || villageStatic.iconName === undefined) &&
      villageStatic.iconUrl === null;
    setDirectoryValidate({
      unit: unitInvalid,
      amount: amountInvalid,
      icon: iconInvalid,
    });
    return unitInvalid || amountInvalid || iconInvalid;
  };

  //Handle actions button
  const onClickSaveButton = async () => {
    const villageStaticInvalid = getAndUpdateVillageStaticValidate();
    if (!villageStaticInvalid) {
      if (villageStaticToUpdate) {
        await updateVillageStatic();
      } else {
        await insertVillageStatic();
      }
      setInitData();
      dispatch(getVillageStatic());
    } else {
      alert("ไม่สามารถทำรายการนี้ได้ เนื่องจากข้อมูลบางส่วนไม่ครบ");
    }
  };

  const updateVillageStatic = async () => {
    let imagesUploadedToDelete = [];
    try {
      const { iconName, iconUrl, ...others } = villageStatic;
      if (villageStaticToUpdate.iconUrl !== iconUrl && iconName === undefined) {
        const { imageRefPath, imageUrlUploaded } = await uploadImages(
          [iconUrl],
          "icons"
        );
        imagesUploadedToDelete = imageRefPath;
        await updateVillageStaticById({
          iconUrl: imageUrlUploaded[0],
          ...others,
        });
        deleteImageUploaded([
          getImageFullPathFromUrl(villageStaticToUpdate.iconUrl, "icons"),
        ]);
      } else {
        await updateVillageStaticById(villageStatic);
      }
    } catch (error) {
      console.log(error);
      alert("ไม่สามารถแก้ไขข้อมูลทางสถิติของหมู่บ้านได้, กรุณาลองอีกครั้ง");
      deleteImageUploaded(imagesUploadedToDelete);
    }
  };

  const insertVillageStatic = async () => {
    let imagesUploadedToDelete = [];
    try {
      const { iconName, iconUrl, ...others } = villageStatic;
      if (villageStatic.iconUrl) {
        const { imageRefPath, imageUrlUploaded } = await uploadImages(
          [iconUrl],
          "icons"
        );
        imagesUploadedToDelete = imageRefPath;
        await createVillageStatic({
          ...others,
          iconUrl: imageUrlUploaded[0],
        }).catch(() => {
          alert("ไม่สามารถเพิ่มข้อมูลทางสถิติของหมู่บ้านได้, กรุณาลองอีกครั้ง");
          deleteImageUploaded(imagesUploadedToDelete);
        });
      } else {
        await createVillageStatic({
          ...others,
          iconName,
        }).catch(() => {
          alert("ไม่สามารถเพิ่มข้อมูลทางสถิติของหมู่บ้านได้, กรุณาลองอีกครั้ง");
        });
      }
    } catch {
      alert("ไม่สามารถเพิ่มข้อมูลทางสถิติของหมู่บ้านได้, กรุณาลองอีกครั้ง");
      deleteImageUploaded(imagesUploadedToDelete);
    }
  };

  const handleConfirmDelete = async () => {
    setConfirmModalOpen(false);
    try {
      const imageProfilePath = getImageFullPathFromUrl(
        villageStaticToDelete.iconUrl,
        "icons"
      );
      deleteImageUploaded([imageProfilePath]);

      await deleteVillageStaticById(villageStaticToDelete.id);
      setInitData();
      dispatch(getVillageStatic());
    } catch {
      alert("ไม่สามารถลบข้อมูลนี้ได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const deleteImageIcon = () => {
    const { iconUrl, ...others } = villageStatic;
    setVillageStatic({
      iconUrl: null,
      ...others,
    });
  };
  return (
    <>
      <div className="management-card static-data">
        <div className="row data-detail">
          <div className="col">
            <h3 className="toppick">ข้อมูลเกี่ยวกับ</h3>
            <TextField
              error={villageStaticValidate.unit}
              value={villageStatic.unit}
              onChange={onUitInputChange}
              label="ข้อมูลเกี่ยวกับ"
              placeholder="เช่น จำนวนประชากร"
              type="text"
              variant="outlined"
            />
          </div>
          <div className="col">
            <h3 className="toppick">จำนวนข้อมูลทางสถิติ</h3>
            <TextField
              error={villageStaticValidate.amount}
              value={villageStatic.amount}
              onChange={onAmountInputChange}
              label="จำนวนข้อมูลทางสถิติ"
              placeholder="เช่น 120"
              type="number"
              variant="outlined"
            />
          </div>
        </div>
        <div className="row icon-manage">
          <div className="col">
            <h3 className="toppick">ชื่อ Icon ที่แสดงข้อมูล</h3>
            <TextField
              error={villageStaticValidate.icon}
              value={villageStatic.iconName}
              onChange={onIconNameInputChange}
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
                  onChange={handleChooseImageIcon}
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
              {villageStatic.iconUrl !== null &&
              villageStatic.iconUrl !== undefined ? (
                <div className="col icon-image">
                  <CardMedia image={getImageUrl(villageStatic.iconUrl)}>
                    <IconButton onClick={deleteImageIcon}>
                      <Icon>clear</Icon>
                    </IconButton>
                  </CardMedia>
                </div>
              ) : null}
            </div>
          </div>
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
            size="small"
            variant="outlined"
            className="green-solid-button"
            onClick={onClickSaveButton}
          >
            บันทึก
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
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
                {villageStatics.map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{row.unit}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">
                      {row.iconName ? (
                        <Icon>{row.iconName}</Icon>
                      ) : (
                        <CardMedia image={row.iconUrl}></CardMedia>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <div className="action-buttons">
                        <IconButton
                          onClick={() => {
                            setVillageStatic(row);
                            setVillageStaticToUpdate(row);
                          }}
                        >
                          <Icon>create</Icon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setVillageStaticToDelete(row);
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
          title="คุณต้องการลบข้อมูลทางสถิติของหมู่บ้านนี้ ใช่ หรือ ไม่"
          descrption={[
            {
              title: "ข้อมูล",
              detail: villageStaticToDelete.unit,
            },
            {
              title: "จำนวน",
              detail: villageStaticToDelete.amount,
            },
          ]}
        ></ConfirmModal>
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => ({
  villageStatics: state.villageHealthVolunteer.villageStatics,
  isLoading: state.villageHealthVolunteer.isLoading,
});
export default connect(mapStateToProps)(StaticData);
