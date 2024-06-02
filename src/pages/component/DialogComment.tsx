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
  onClick: () => void;
  inputComment: string;
  setInputComment: React.Dispatch<React.SetStateAction<string>>;
}

const DialogComment: React.FC<DialogCommentProps> = ({
  open,
  onClose,
  onClick,
  inputComment,
  setInputComment,
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
          width: 343,
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
      >
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <DialogTitle sx={{ pt: 0 }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            color: theme.palette.text.primary,
          }}
        >
          Add Comments
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <TextField
          name="textValue"
          fullWidth
          rows={4}
          value={inputComment}
          multiline
          onChange={(e) => setInputComment(e.target.value)}
          variant="outlined"
          placeholder="What’s on your mind..."
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      </DialogContent>
      <DialogContent>
        <Stack spacing={1} direction="column">
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              fontWeight: "600",
              fontSize: "0.875rem",
              color: theme.palette.success.main,
              border: `1px solid ${theme.palette.success.main}`,
              borderRadius: "8px",
              textTransform: "none",
              backgroundColor: "transparent",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onClick}
            sx={{
              fontWeight: "600",
              fontSize: "0.875rem",
              color: theme.palette.custom.white,
              border: `1px solid ${theme.palette.success.main}`,
              borderRadius: "8px",
              textTransform: "none",
              backgroundColor: theme.palette.success.main,
              "&:hover": {
                backgroundColor: theme.palette.success.main,
              },
            }}
          >
            Post
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComment;
