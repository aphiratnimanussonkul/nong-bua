import React from "react";
import { Dialog, CircularProgress } from "@material-ui/core";

import "./loading-dialog.scss";

const LoadingDialog = ({ open }) => {
  return (
    <Dialog open={open} className="loading-dialog">
      <CircularProgress />
    </Dialog>
  );
};

export default LoadingDialog;
