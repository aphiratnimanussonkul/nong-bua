import React from "react";

import "./village-fund-project.scss";
import {
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Icon,
} from "@material-ui/core";

const VillageFundPorject = () => {
  //Table Data
  const headers = [
    { name: "ลำดับที่", align: "center" },
    { name: "ชื่อโครงการ", align: "left" },
    { name: "แก้ไข / ลบ", align: "right" },
  ];
  const rows = [
    { name: "ธนาคารปุ๋ย" },
    { name: "ธนาคารปุ๋ย" },
    { name: "ธนาคารปุ๋ย" },
    { name: "ธนาคารปุ๋ย" },
  ];

  return (
    <>
      <div className="management-card village-fund-project">
        <div className="row">
          <div className="col">
            <h3 className="toppick">ชื่อโครงการ</h3>
            <TextField label="ชื่อโครงการ" type="text" variant="outlined" />
          </div>
        </div>
        <div className="row">
          <div className="col hint">
            <p>*** ใช่ชื่อโครงการ โดยไม่ต้องใส่คำว่าโครงการ เช่น ธนาคารปุ๋ย</p>
          </div>
          <div className="col action-button">
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
      </div>
      <div className="project-table management-card">
        <h3 className="toppick">รายชื่อโครงการของกองทุนหมู่บ้าน</h3>
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
                  <TableCell align="left">โครงการ {row.name}</TableCell>
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

export default VillageFundPorject;
