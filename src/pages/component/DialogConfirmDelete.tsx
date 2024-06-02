import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface DialogCommentProps {
  open: boolean;
  onClose: () => void;
}

const DialogConfirmDelete: React.FC<DialogCommentProps> = ({
  open,
  onClose,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          width: { xs: 343, md: 400 },
          borderRadius: "12px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: "11px 9px 0px 0px",
        }}
      ></Box>
      <DialogTitle sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          Please confirm if you wish to <br /> delete the post
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          pb: 0,
          textAlign: "center",
          fontSize: "14px",
          fontWeight: 400,
          color: "#5B5B5B",
        }}
      >
        Are you sure you want to delete the post? <br /> Once deleted, it cannot
        be recovered.
      </DialogContent>
      <DialogContent>
        <Stack
          spacing={{ xs: 1, md: 0 }}
          gap={{ xs: 0, md: 1 }}
          sx={{ flexDirection: { xs: "column", md: "row-reverse" } }}
        >
          <Button
            onClick={onClose}
            sx={{
              fontWeight: "600",
              fontSize: "0.875rem",
              width: { xs: "100%", md: 170 },
              color: theme.palette.custom.white,
              border: `1px solid ${theme.palette.error.main}`,
              borderRadius: "8px",
              textTransform: "none",
              backgroundColor: theme.palette.error.main,
              "&:hover": {
                backgroundColor: theme.palette.error.main,
              },
            }}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              width: { xs: "100%", md: 170 },
              fontWeight: "600",
              fontSize: "0.875rem",
              color: theme.palette.text.primary,
              borderRadius: "8px",
              textTransform: "none",
              backgroundColor: "transparent",
            }}
          >
            Cancel
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirmDelete;
