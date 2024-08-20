import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

export function FormDialog({
  title,
  open,
  children,
  onClose,
}: {
  title: string;
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "580px",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
}
