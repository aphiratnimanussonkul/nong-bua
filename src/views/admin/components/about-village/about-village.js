import React, { useState, useEffect } from "react";

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
import {
  deleteImageUploaded,
  uploadImages,
} from "../../../../actions/upload-image";
import UploadIcon from "../../../../assets/upload.png";
import {
  getImageFullPathFromUrl,
  getImageUrl,
} from "../../../../helpers/image-url/image-url";
import {
  getAllAboutVillage,
  updateAboutVillageById,
  createAboutVillage,
  deleteAboutVillageById,
} from "../../../../actions/about-village";
import Loading from "../../../../components/loading/loading";
import ConfirmModal from "../../../../components/confirm-modal/confirm-modal";
import { connect } from "react-redux";

const AboutVillage = ({ dispatch, isLoading, aboutVillage }) => {
  const aboutVillageOrders = [
    "INTRODUCE",
    ...Array.from(Array(5), (_, i) => i + 1),
  ];
  const headers = [
    { name: "ลำดับที่", align: "center" },
    { name: "หัวข้อข่าว", align: "left" },
    { name: "เนื้อหา", align: "left" },
    { name: "รูปภาพ", align: "center" },
    { name: "ลำดับการแสดง", align: "center" },
    { name: "แก้ไข / ลบ", align: "right" },
  ];

  useEffect(() => {
    dispatch(getAllAboutVillage());
  }, [dispatch]);

  //State for create news
  const initCreateAboutVillage = {
    title: "",
    sorting: null,
    detail: "",
    image: null,
  };
  const [createAboutVillageDetail, setCreateAboutVillageDetail] = useState(
    initCreateAboutVillage
  );
  const initAboutVillageValidate = {
    title: false,
    sorting: false,
    detail: false,
    image: false,
  };
  const [aboutVillageValidate, setAboutVillageValidate] = useState(
    initAboutVillageValidate
  );

  //State for delete news
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [aboutVillageToDelete, setAboutVillageToDelete] = useState(null);

  //State for update news
  const [aboutVillageToUpdate, setAboutVillageToUpdate] = useState(null);

  const setInitData = () => {
    setCreateAboutVillageDetail(initCreateAboutVillage);
    setAboutVillageValidate(initAboutVillageValidate);
    setAboutVillageToDelete(null);
    setAboutVillageToUpdate(null);
  };

  //Set data to create news
  const handleInputTitleChange = (event) => {
    const { title, ...others } = createAboutVillageDetail;
    setCreateAboutVillageDetail({ title: event.target.value, ...others });
  };

  const handleSortingChange = (event) => {
    const { sorting, ...others } = createAboutVillageDetail;
    setCreateAboutVillageDetail({ sorting: event.target.value, ...others });
  };

  const handleTextAreaContentChange = (event) => {
    const { detail, ...others } = createAboutVillageDetail;
    setCreateAboutVillageDetail({ detail: event.target.value, ...others });
  };

  const handleChooseImageProfile = (event) => {
    const { image, ...other } = createAboutVillageDetail;
    setCreateAboutVillageDetail({
      image: event.target.files[0],
      ...other,
    });
  };

  //Handle action button
  const onClickSaveAboutVillage = async () => {
    const aboutVillageDetailInValid = getAndUpdateCreateVillageValidate();
    if (!aboutVillageDetailInValid) {
      if (aboutVillageToUpdate) {
        await updateAboutVillage();
      } else {
        await insertAboutVillage();
      }
      setInitData();
      dispatch(getAllAboutVillage());
    }
  };

  const updateAboutVillage = async () => {
    let imagesUploadedToDelete = [];
    try {
      if (aboutVillageToUpdate.image !== createAboutVillageDetail.image) {
        const { imageRefPath, imageUrlUploaded } = await uploadImages(
          [createAboutVillageDetail.image],
          "about-village"
        );
        imagesUploadedToDelete = imageRefPath;
        const { image, ...others } = createAboutVillageDetail;
        await updateAboutVillageById({
          image: imageUrlUploaded[0],
          ...others,
        });
        deleteImageUploaded([
          getImageFullPathFromUrl(aboutVillageToUpdate.image, "about-village"),
        ]);
      } else {
        await updateAboutVillageById(createAboutVillageDetail);
      }
    } catch (error) {
      alert("ไม่สามารถแก้ไขข้อมูลเกี่ยวกับหมู่บ้านได้, กรุณาลองอีกครั้ง");
      deleteImageUploaded(imagesUploadedToDelete);
    }
  };

  const insertAboutVillage = async () => {
    let imagesUploadedToDelete = [];
    try {
      const { imageRefPath, imageUrlUploaded } = await uploadImages(
        [createAboutVillageDetail.image],
        "about-village"
      );
      imagesUploadedToDelete = imageRefPath;
      const { image, ...others } = createAboutVillageDetail;
      await createAboutVillage({
        ...others,
        image: imageUrlUploaded[0],
      }).catch(() => {
        alert("ไม่สามารถเพิ่มข้อมูลเกี่ยวกับหมู่บ้านได้, กรุณาลองอีกครั้ง");
        deleteImageUploaded(imagesUploadedToDelete);
      });
    } catch {
      alert("ไม่สามารถเพิ่มข้อมูลเกี่ยวกับหมู่บ้านได้, กรุณาลองอีกครั้ง");
      deleteImageUploaded(imagesUploadedToDelete);
    }
  };

  const getAndUpdateCreateVillageValidate = () => {
    const titleInValid = createAboutVillageDetail.title === "";
    const sortingInValid = createAboutVillageDetail.sorting === null;
    const detailInValid = createAboutVillageDetail.detail === "";
    const imageInValid = createAboutVillageDetail.image === null;

    setAboutVillageValidate({
      title: titleInValid,
      sorting: sortingInValid,
      detail: detailInValid,
      image: imageInValid,
    });
    return titleInValid || sortingInValid || detailInValid || imageInValid;
  };

  const onClickDeleteAboutVillage = (news) => {
    setAboutVillageToDelete(news);
    setConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmModalOpen(false);
    deleteImageUploaded([
      getImageFullPathFromUrl(aboutVillageToDelete.image, "news-images"),
    ]);
    await deleteAboutVillageById(aboutVillageToDelete.id);
    setInitData();
    dispatch(getAllAboutVillage());
  };

  return (
    <>
      <div className="management-card about-village-manage">
        <div className="row">
          <div className="col title">
            <h3 className="toppick">หัวข้อข้อมูล</h3>
            <TextField
              error={aboutVillageValidate.title}
              value={createAboutVillageDetail.title}
              onChange={handleInputTitleChange}
              label="หัวข้อข้อมูล"
              type="text"
              variant="outlined"
            />
          </div>

          <div className="col sorting">
            <h3 className="toppick">ลำดับการแสดง</h3>
            <FormControl variant="outlined">
              <Select
                variant="outlined"
                value={createAboutVillageDetail.sorting}
                onChange={handleSortingChange}
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
            <TextareaAutosize
              className={aboutVillageValidate.detail ? "text-area-error" : null}
              value={createAboutVillageDetail.detail}
              onChange={handleTextAreaContentChange}
              rowsMin={5}
              placeholder="เนื้อหา"
            />
          </div>
        </div>
        <div className="row">
          <div className="col image">
            <h3 className="toppick">รูปภาพ</h3>
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
                  <p>เลือกรูปภาพที่ต้องการอัพโหลด</p>
                </div>
              </div>
            </label>
          </div>
          {createAboutVillageDetail !== null &&
          createAboutVillageDetail !== undefined ? (
            <div className="col image-selected">
              <h3 className="toppick">รูปภาพที่เลือก</h3>
              <CardMedia
                image={getImageUrl(createAboutVillageDetail.image)}
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
            size="small"
            variant="outlined"
            className="green-solid-button"
            onClick={onClickSaveAboutVillage}
          >
            บันทึก
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
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
                {aboutVillage.map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">
                      <p>{row.detail}</p>
                    </TableCell>
                    <TableCell align="left">
                      <CardMedia image={row.image}></CardMedia>
                    </TableCell>
                    <TableCell align="center">{row.sorting}</TableCell>
                    <TableCell align="right">
                      <div className="action-buttons">
                        <IconButton
                          onClick={() => {
                            setCreateAboutVillageDetail(row);
                            setAboutVillageToUpdate(row);
                          }}
                        >
                          <Icon>create</Icon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            onClickDeleteAboutVillage(row);
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
          title="คุณต้องการลบข้อมูลเกี่ยวกับหมู่บ้านเรื่องนี้ ใช่ หรือ ไม่"
          descrption={[
            {
              title: "หัวข้อ",
              detail: aboutVillageToDelete.title,
            },
            {
              title: "เนื้อหา",
              detail: aboutVillageToDelete.detail,
            },
          ]}
        ></ConfirmModal>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  aboutVillage: state.aboutVillage.aboutVillage,
  isLoading: state.aboutVillage.isLoading,
});
export default connect(mapStateToProps)(AboutVillage);
