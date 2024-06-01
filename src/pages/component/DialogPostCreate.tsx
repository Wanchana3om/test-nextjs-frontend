import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
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

const DialogPost: React.FC<DialogCommentProps> = ({ open, onClose }) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          width: { xs: 343, md: 685 },
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
            fontSize: "24px",
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          Create Post
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{
              width: { xs: "100%", md: 195 },
              fontSize: "14px",
              fontWeight: 600,
              backgroundColor: "transparent",
              height: "44px",
              color: theme.palette.success.main,
              border: `1px solid ${theme.palette.success.main}`,
              borderRadius: "8px",
            }}
            defaultValue="Community"
          >
            <MenuItem value="Community" sx={{ display: "none" }}>
              Choose a community
            </MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="History">History</MenuItem>
            <MenuItem value="Pets">Pets</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="text"
          placeholder="Title"
          autoComplete="off"
          sx={{
            mt: 1,
            width: "100%",
            "& .MuiInputBase-root": {
              height: "44px",
              borderRadius: "8px",
              backgroundColor: "common.white",
            },
          }}
        />
        <TextField
          name="textValue"
          fullWidth
          rows={10}
          multiline
          variant="outlined"
          placeholder="What’s on your mind..."
          sx={{
            mt: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      </DialogContent>
      <DialogContent>
        <Stack
          spacing={{ xs: 1, md: 0 }}
          gap={{ xs: 0, md: 1 }}
          sx={{
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "end" },
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              fontWeight: "600",
              fontSize: "0.875rem",
              width: { xs: "100%", md: 105 },
              color: theme.palette.success.main,
              border: `1px solid ${theme.palette.success.main}`,
              borderRadius: "8px",
              textTransform: "none",
              backgroundColor: "transparent",
              mr: 2,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onClose}
            sx={{
              fontWeight: "600",
              width: { xs: "100%", md: 105 },
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

export default DialogPost;
