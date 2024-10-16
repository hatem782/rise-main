import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import { useState } from "react";

export default function CustomizedDialogs(props) {
  const {
    open,
    handleClose,
    children,
    auto_close = false,
    duration = 4000,
    onClose = () => {},
  } = props;

  const [gate, setgate] = useState(false);

  useEffect(() => {
    if (auto_close && open) {
      setTimeout(() => {
        handleClose();
      }, duration);
    }
    if (open) {
      setgate(true);
    }
  }, [open]);

  useEffect(() => {
    if (!open && gate) {
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }, [open, gate]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "fit-content",
            position: "relative",
          },
        },
      }}
    >
      {children}
    </Dialog>
  );
}
