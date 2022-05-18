import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const DefaultDialog = forwardRef(
  ({ title, onClose, children, ...rest }, ref) => {
    const [open, setOpen] = useState(false);

    const onCloseHandler = () => {
      onClose && onClose();
    };

    useImperativeHandle(ref, () => ({
      Open() {
        setOpen(true);
      },
      Lose() {
        setOpen(false);
      },
    }));

    return (
      <Dialog open={open} onClose={onCloseHandler}>
        <DialogTitle>{title}</DialogTitle>
        {children}
      </Dialog>
    );
  }
);

export default DefaultDialog;
