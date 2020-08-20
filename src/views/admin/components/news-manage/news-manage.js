import React, { useState, useEffect } from "react";

import Loading from "../../../../components/loading/loading";
import "./news-manage.scss";
import {
  TextField,
  FormControl,
  Select,
  Chip,
  MenuItem,
  TextareaAutosize,
  GridList,
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
import UploadGrayIcon from "../../../../assets/upload-gray.png";
import { connect } from "react-redux";
import { getNews } from "../../../../actions/home";
import {
  createNews,
  deleteNewsById,
  updateNewsById,
} from "../../../../actions/read-news";
import { convertHowLong } from "../../../../helpers/convert-how-long/index";
import {
  uploadImages,
  deleteImageUploaded,
} from "../../../../actions/upload-image";
import ConfirmModal from "../../../../components/confirm-modal/confirm-modal";
import { getImageUrl } from "../../../../helpers/image-url/image-url";

const NewsManage = ({ dispatch, news, isLoading }) => {
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  // Const variable
  const headers = [
    { name: "ลำดับที่", align: "center" },
    { name: "หัวข้อข่าว", align: "left" },
    { name: "รูปภาพ", align: "left" },
    { name: "ประเภท", align: "left" },
    { name: "เขียนเมื่อ", align: "left" },
    { name: "แก้ไข / ลบ", align: "right" },
  ];
  const tagsSelecter = [
    {
      name: "อสม",
    },
    {
      name: "กองทุนหมู่บ้าน",
    },
    {
      name: "อื่นๆ",
    },
  ];

  //State for create news
  const initCreateNewsDetail = {
    title: "",
    tags: [],
    description: "",
    images: [],
  };
  const [createNewsDetail, setCreateNewsDetail] = useState(
    initCreateNewsDetail
  );
  const initCreateNewsDatailValidate = {
    title: false,
    tags: false,
    description: false,
    images: false,
  };
  const [createNewsDatailValidate, setCreateNewsDatailValidate] = useState(
    initCreateNewsDatailValidate
  );

  //State for delete news
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  //State for update news
  const [newsToUpdate, setNewsToUpdate] = useState(null);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const setInitData = () => {
    setCreateNewsDetail(initCreateNewsDetail);
    setCreateNewsDatailValidate(initCreateNewsDatailValidate);
    setNewsToUpdate(null);
    setNewsToDelete(null);
    setImagesToUpload([]);
    setImagesToDelete([]);
  };
  
  const isImagesHaveFour = () => {
    return createNewsDetail.images.length + imagesToUpload.length >= 4;
  };

  const isImageOnServer = (image) => {
    try {
      URL.createObjectURL(image);
      return false;
    } catch {
      return true;
    }
  };

  const getImageFullPathFromUrl = (imageUrl) => {
    const indexSubStr = imageUrl.indexOf("news-images");
    const iamgePathLenght = imageUrl.indexOf("?alt") - indexSubStr;
    const imagePath = imageUrl.substr(indexSubStr, iamgePathLenght);
    return decodeURIComponent(imagePath);
  };

  //Set data to create news
  const handleInputTitleChange = (event) => {
    const { title, ...others } = createNewsDetail;
    setCreateNewsDetail({ title: event.target.value, ...others });
    getAndUpdateCreateNewsDetailValidate();
  };

  const handleTagsChange = (event) => {
    const { tags, ...others } = createNewsDetail;
    setCreateNewsDetail({ tags: event.target.value, ...others });
    getAndUpdateCreateNewsDetailValidate();
  };

  const handleTextAreaContentChange = (event) => {
    const { description, ...others } = createNewsDetail;
    setCreateNewsDetail({ description: event.target.value, ...others });
    getAndUpdateCreateNewsDetailValidate();
  };

  const handleChooseFile = (event) => {
    const newImage = event.target.files[0];
    if (!imagesToUpload.find((image) => image.name === newImage.name)) {
      setImagesToUpload([...imagesToUpload, newImage]);
    }
    document.getElementById("file-upload").value = null;
  };

  const deleteImage = (imageDelete) => {
    const { images, ...others } = createNewsDetail;
    if (isImageOnServer(imageDelete)) {
      setImagesToDelete([
        ...imagesToDelete,
        getImageFullPathFromUrl(imageDelete),
      ]);
      if (images.length === 1) {
        setCreateNewsDetail({ images: [], ...others });
        return;
      }
      setCreateNewsDetail({
        images: images.filter((image) => image !== imageDelete),
        ...others,
      });
    } else {
      if (imagesToUpload.length === 1) {
        setImagesToUpload([]);
        return;
      }
      setImagesToUpload([
        imagesToUpload.filter((image) => image !== imageDelete),
      ]);
    }
  };

  //Handle action button
  const onClickSaveNews = () => {
    if (newsToUpdate) {
      updateNews();
    } else {
      insertNews();
    }
  };

  const updateNews = async () => {
    const crateNewsDetailInValid = getAndUpdateCreateNewsDetailValidate();
    if (!crateNewsDetailInValid) {
      let imagesUploadedToDelete = [];
      try {
        deleteImageUploaded(imagesToDelete);
        if (imagesToUpload.length) {
          const { imageRefPath, imageUrlUploaded } = await uploadImages(
            imagesToUpload,
            "news-images"
          );
          imagesUploadedToDelete = imageRefPath;
          const { images, ...others } = createNewsDetail;
          await updateNewsById({
            images: [...images, ...imageUrlUploaded],
            ...others,
          });
        } else {
          await updateNewsById(createNewsDetail);
        }

        setInitData();
        dispatch(getNews());
      } catch {
        deleteImageUploaded(imagesUploadedToDelete);
        alert("ไม่สามารถแก้ไขข่าวนี้ได้ กรุณาลองใหม่อีกครั้ง");
      }
    }
  };

  const insertNews = async () => {
    const crateNewsDetailInValid = getAndUpdateCreateNewsDetailValidate();
    if (!crateNewsDetailInValid) {
      try {
        const { imageRefPath, imageUrlUploaded } = await uploadImages(
          imagesToUpload,
          "news-images"
        );
        const { images, ...others } = createNewsDetail;
        await createNews({ images: imageUrlUploaded, ...others })
          .then(() => {
            setInitData();
            dispatch(getNews());
          })
          .catch(() => {
            deleteImageUploaded(imageRefPath);
          });
      } catch (error) {
        alert("ไม่สามารถเพิ่มข่าวได้, กรุณาลองใหม่อีกครั้ง");
        setCreateNewsDatailValidate(initCreateNewsDatailValidate);
        setCreateNewsDetail(initCreateNewsDetail);
      }
    } else {
      alert("ไม่สามารถเพิ่มข่าวได้ เนื่องจากข้อมูลบางส่วนไม่ครบ");
    }
  };

  const getAndUpdateCreateNewsDetailValidate = () => {
    const titleInValid = createNewsDetail.title === "";
    const tagsInValid = createNewsDetail.tags.length ? false : true;
    const descriptionInValid = createNewsDetail.description === "";
    const imagesInValid = imagesToUpload.length
      ? false
      : true || createNewsDetail.images.length
      ? false
      : true;
    setCreateNewsDatailValidate({
      title: titleInValid,
      tags: tagsInValid,
      description: descriptionInValid,
      images: imagesInValid,
    });
    return titleInValid || tagsInValid || descriptionInValid || imagesInValid;
  };

  const onClickDeleteNews = (news) => {
    setNewsToDelete(news);
    setConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmModalOpen(false);
    deleteImageUploaded(
      newsToDelete.images.map((image) => getImageFullPathFromUrl(image))
    );
    await deleteNewsById(newsToDelete.id);
    setInitData();
    dispatch(getNews());
  };

  return (
    <>
      <div className="management-card news-manage">
        <div className="row">
          <div className="col title">
            <h3 className="toppick">หัวข้อข่าว</h3>
            <TextField
              error={createNewsDatailValidate.title}
              onChange={handleInputTitleChange}
              value={createNewsDetail.title}
              label="หัวข้อข่าว"
              placeholder="เช่น กองทุนหมู่บ้าน จัดประชุมเกี่ยวกับ ..."
              type="text"
              variant="outlined"
            />
          </div>

          <div className="col tags">
            <h3 className="toppick">ประเภทข่าว</h3>
            <FormControl variant="outlined">
              <Select
                multiple
                variant="outlined"
                error={createNewsDatailValidate.tags}
                value={createNewsDetail.tags}
                onChange={handleTagsChange}
                renderValue={(tags) => {
                  return (
                    <div>
                      {createNewsDetail.tags.map((value) => (
                        <Chip key={value} label={value} className="chip" />
                      ))}
                    </div>
                  );
                }}
              >
                {tagsSelecter.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="col content">
            <h3 className="toppick">เนื้อหาข่าว</h3>
            <TextareaAutosize
              className={
                createNewsDatailValidate.description ? "text-area-error" : null
              }
              rowsMin={5}
              placeholder="เนื้อหา"
              value={createNewsDetail.description}
              onChange={handleTextAreaContentChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col images">
            <h3 className="toppick">รูปภาพ</h3>
            <input
              onChange={handleChooseFile}
              id="file-upload"
              type="file"
              disabled={isImagesHaveFour()}
              accept="image/png, image/jpeg"
            />
            <label for="file-upload">
              <div
                className={
                  isImagesHaveFour()
                    ? "file-selector disable"
                    : "file-selector "
                }
              >
                <div className="col">
                  <img
                    src={isImagesHaveFour() ? UploadGrayIcon : UploadIcon}
                    alt=""
                  />
                  <p>
                    {isImagesHaveFour()
                      ? "จำกัดจำนวนรูปภาพ 4 ภาพเท่านั้น"
                      : "เลือกรูปภาพที่ต้องการอัพโหลด"}
                  </p>
                </div>
              </div>
            </label>
          </div>
          <div className="col images-selected">
            <h3 className="toppick">รูปภาพที่เลือก</h3>
            <GridList>
              {createNewsDetail.images.map((image, index) => (
                <CardMedia image={getImageUrl(image)} key={index}>
                  <IconButton onClick={() => deleteImage(image)}>
                    <Icon>clear</Icon>
                  </IconButton>
                </CardMedia>
              ))}
              {imagesToUpload.map((image, index) => (
                <CardMedia image={getImageUrl(image)} key={index}>
                  <IconButton onClick={() => deleteImage(image)}>
                    <Icon>clear</Icon>
                  </IconButton>
                </CardMedia>
              ))}
            </GridList>
          </div>
        </div>
        <div className="row action-button">
          <Button
            size="small"
            variant="outlined"
            className="brown-yellow-outlined-button"
            onClick={setInitData}
          >
            ยกเลิก
          </Button>
          <Button
            size="small"
            variant="outlined"
            className="green-solid-button"
            onClick={onClickSaveNews}
          >
            บันทึก
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="news-list management-card">
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
                {news.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">
                      <div className="table-images">
                        {row.images.map((image, index) => (
                          <CardMedia image={image} key={index}></CardMedia>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {row.tags.map((value) => (
                          <Chip key={value} label={value} className="chip" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      {convertHowLong(row.createdAt.seconds)}
                    </TableCell>
                    <TableCell align="right">
                      <div className="action-buttons">
                        <IconButton
                          onClick={() => {
                            setNewsToUpdate(row);
                            setCreateNewsDetail(row);
                          }}
                        >
                          <Icon>create</Icon>
                        </IconButton>
                        <IconButton onClick={() => onClickDeleteNews(row)}>
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
          title="คุณต้องการลบข่าวนี้ ใช่ หรือ ไม่"
          descrption={[
            {
              title: "หัวข้อข่าว",
              detail: newsToDelete.title,
            },
            {
              title: "เนื้อหา",
              detail: newsToDelete.description,
            },
          ]}
        ></ConfirmModal>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  news: state.home.news,
  isLoading: state.home.isLoading,
});

export default connect(mapStateToProps)(NewsManage);
