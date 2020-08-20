import React from "react";

import "./confirm-modal.scss";
import { Divider, Button, Modal } from "@material-ui/core";

const ConfirmModal = ({ title, descrption, onConfirm, onCancel }) => {
  return (
    <>
      <Modal open={true} onClose={onCancel}>
        <div className="modal">
          <h3 className="toppick">{title}</h3>
          <Divider />
          <div className="detail">
            {descrption.map((el) => (
              <div className="row">
                <div className="col title">
                  <p>{el.title} : </p>
                </div>
                <div className="col">
                  <p>{el.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <Divider />
          <div className="row action-button">
            <Button
              size="small"
              variant="outlined"
              className="green-solid-button"
              onClick={onCancel}
            >
              ยกเลิก
            </Button>
            <Button
              size="small"
              variant="outlined"
              className="brown-yellow-outlined-button"
              onClick={onConfirm}
            >
              ยืนยันการลบ
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmModal;
