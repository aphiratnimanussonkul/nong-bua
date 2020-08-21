import React, { useEffect, useState } from "react";

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
import {
  getVillageProject,
  createVillageFundProject,
  deleteVillageProjectById,
} from "../../../../actions/village-fund";
import ConfirmModal from "../../../../components/confirm-modal/confirm-modal";
import { connect } from "react-redux";
import Loading from "../../../../components/loading/loading";

const VillageFundPorject = ({ dispatch, isLoading, projects }) => {
  const headers = [
    { name: "ลำดับที่", align: "center" },
    { name: "ชื่อโครงการ", align: "left" },
    { name: "แก้ไข / ลบ", align: "right" },
  ];

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [projectNameInValid, setProjectNameInValid] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    dispatch(getVillageProject());
  }, [dispatch]);

  const onProjectNameInputChange = (event) => {
    setProjectName(event.target.value);
  };

  const setInitData = () => {
    setProjectNameInValid(false);
    setProjectName("");
    setProjectToDelete(null);
    dispatch(getVillageProject());
  };

  const onSaveButtonClick = () => {
    const isProjectNameEmpty = projectName === null || projectName === "";
    setProjectNameInValid(isProjectNameEmpty);
    if (!isProjectNameEmpty) {
      try {
        createVillageFundProject(projectName)
          .then(() => {
            setInitData();
          })
          .catch(() => alert("ไม่สามารถเพิ่มโครงการได้, กรุณาลองใหม่อีกครั้ง"));
      } catch {
        alert("ไม่สามารถเพิ่มโครงการได้, กรุณาลองใหม่อีกครั้ง");
      }
    }
  };

  const onConfirmDeleteProject = () => {
    setConfirmModalOpen(false)
    try {
      deleteVillageProjectById(projectToDelete.id)
        .then(() => setInitData())
        .catch(() => alert("ไม่สามารถลบโครงการได้, กรุณาลองใหม่อีกครั้ง"));
    } catch {
      alert("ไม่สามารถลบโครงการได้, กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <>
      <div className="management-card village-fund-project">
        <div className="row">
          <div className="col">
            <h3 className="toppick">ชื่อโครงการ</h3>
            <TextField
              value={projectName}
              error={projectNameInValid}
              onChange={onProjectNameInputChange}
              label="ชื่อโครงการ"
              type="text"
              variant="outlined"
            />
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
              onClick={onSaveButtonClick}
              size="small"
              variant="outlined"
              className="green-solid-button"
            >
              บันทึก
            </Button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
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
                {projects.map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">โครงการ {row.name}</TableCell>
                    <TableCell align="right">
                      <div className="action-buttons">
                        <IconButton>
                          <Icon>create</Icon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setProjectToDelete(row);
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
          onConfirm={onConfirmDeleteProject}
          title="คุณต้องการลบโครงการนี้ ใช่ หรือ ไม่"
          descrption={[
            {
              title: "ชื่อโครงการ",
              detail: projectToDelete.name,
            },
          ]}
        ></ConfirmModal>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.villageFund.isLoading,
  projects: state.villageFund.projects,
});

export default connect(mapStateToProps)(VillageFundPorject);
