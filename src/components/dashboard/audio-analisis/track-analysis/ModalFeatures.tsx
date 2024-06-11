import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
} from "@mui/material";

import style from "./style.module.css";
import { details } from "./mock/dataDetailsFeatures";

interface ModalFeaturesProps {
  open: boolean;
  handleClose: () => void;
}

export const ModalFeatures: React.FunctionComponent<ModalFeaturesProps> = ({
  open,
  handleClose,
}) => {
  const [page, setPage] = useState(0);

  const handleNext = () => {
    if (page < details.length - 1) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={style.dialogTitle}>
        Descripción de los Features
        <Button onClick={handleClose} className={style.buttonClose}>
          x
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box minHeight={230} maxHeight={300}>
          <Typography className={style.title}>{details[page].title}</Typography>
          <Typography className={style.text}>{details[page].text}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handlePrev}
          className={style.button}
          disabled={page === 0}
        >
          Atrás
        </Button>
        <Typography>
          {page + 1}/{details.length}
        </Typography>
        <Button
          onClick={handleNext}
          className={style.button}
          disabled={page === details.length - 1}
        >
          Siguiente
        </Button>
      </DialogActions>
    </Dialog>
  );
};
