import React, { useState } from "react";

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
} from "@material-ui/core";

import UploadIcon from "../../../../assets/upload.png";
import UploadGrayIcon from "../../../../assets/upload-gray.png";

const NewsManage = () => {
  const [images, setImages] = useState([]);
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

  const [tags, setTags] = useState([]);

  const handleChange = (event) => {
    setTags(event.target.value);
  };

  const handleChooseFile = (event) => {
    const newImage = event.target.files[0];
    if (!images.find((image) => image.name === newImage.name)) {
      setImages([...images, newImage]);
    }
  };

  const isImagesHaveFour = () => {
    return images.length >= 4;
  };

  const createUrlImage = (file) => {
    return URL.createObjectURL(file);
  };

  const deleteImage = (imageDelete) => {
    if (images.length === 1) {
      setImages([]);
      return;
    }
    setImages(
      images.splice(
        images.findIndex((image) => image === imageDelete),
        1
      )
    );
  };
  
  return (
    <div className="news-manage">
      <div className="row">
        <div className="col title">
          <h3 className="toppick">หัวข้อข่าว</h3>
          <TextField
            label="หัวข้อข่าว"
            type="text"
            variant="outlined"
            InputProps={{
              classes: {
                root: {
                  "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
                    borderColor: "#80b156",
                  },
                },
              },
            }}
          />
        </div>

        <div className="col tags">
          <h3 className="toppick">ประเภทข่าว</h3>
          <FormControl variant="outlined">
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              variant="outlined"
              value={tags}
              onChange={handleChange}
              renderValue={(tags) => {
                console.log(tags);
                return (
                  <div>
                    {tags.map((value) => (
                      <Chip key={value} label={value} className="chip" />
                    ))}
                  </div>
                );
              }}
            >
              {tagsSelecter.map((option) => (
                <MenuItem
                  key={option.name}
                  value={option.name}
                  // style={getStyles(name, personName, theme)}
                >
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
          <TextareaAutosize rowsMin={5} placeholder="เนื้อหา" />
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
                isImagesHaveFour() ? "file-selector disable" : "file-selector "
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
            {images.map((image) => (
              <CardMedia image={createUrlImage(image)}>
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
        >
          ยกเลิก
        </Button>
        <Button size="small" variant="outlined" className="green-solid-button">
          บันทึก
        </Button>
      </div>
    </div>
  );
};

export default NewsManage;
