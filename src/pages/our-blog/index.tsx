import NavBar from "@/pages/component/NavBar";
import React, { useState } from "react";
import SideBar from "../component/SideBar";
import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import OurPost from "../component/OurPost";
import DialogPostEdit from "../component/DialogPostEdit";
import DialogPostCreate from "../component/DialogPostCreate";
import { useRouter } from "next/navigation";
import DialogConfirmDelete from "../component/DialogConfirmDelete";

export default function OurBlogPage() {
  const theme = useTheme();
  const router = useRouter();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [communityType, setCommunityType] = useState("Community");
  const [value, setValue] = useState("");
  const [openDialogPostEdit, setOpenDialogPostEdit] = useState<boolean>(false);
  const [openDialogPostDelete, setOpenDialogPostDelete] =
    useState<boolean>(false);
  const [openDialogPostCreate, setOpenDialogPostCreate] =
    useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCommunityType(event.target.value);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleEdit = () => {
    setOpenDialogPostEdit(!openDialogPostEdit);
  };

  const handleCreate = () => {
    setOpenDialogPostCreate(!openDialogPostCreate);
  };

  const handleDelete = () => {
    setOpenDialogPostDelete(!openDialogPostDelete);
  };

  const mockData = [1, 3];

  return (
    <Stack direction="column" spacing={0}>
      <NavBar />
      <Stack direction="row">
        <SideBar />
        <Stack
          direction="row"
          sx={{
            width: "100%",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Stack
            sx={{
              width: "100%",
              backgroundColor: theme.palette.background.default,
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                width: "90%",
                backgroundColor: theme.palette.custom.base100,
                mt: 4.5,
              }}
            >
              <Stack direction="row" spacing={1} flex={1} sx={{ pb: 3 }}>
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={handleChangeText}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        height: "40px",
                        borderRadius: "8px",
                        backgroundColor: theme.palette.background.default,
                        border: "1px solid white",
                        "&:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px transparent inset",
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton edge="start">
                            <Image
                              src="/icon/search.svg"
                              alt="search"
                              width={20}
                              height={20}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <Select
                  className="dropdown"
                  value={communityType || "Community"}
                  onChange={handleChange}
                  MenuProps={{
                    className: "dropdown-xs-full",
                  }}
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    backgroundColor: "transparent",
                    height: "40px",
                    width: "128px",
                    color: theme.palette.text.primary,
                    border: "none",
                    borderRadius: "8px",
                  }}
                >
                  <MenuItem value="Community" sx={{ display: "none" }}>
                    Community
                  </MenuItem>
                  <MenuItem value="active">active</MenuItem>
                  <MenuItem value="inactive">inactive</MenuItem>
                </Select>
                <Stack
                  onClick={handleCreate}
                  sx={{
                    textAlign: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.success.main,
                    color: theme.palette.custom.white,
                    fontWeight: 600,
                    height: "40px",
                    minWidth: "105px",
                    ":hover": { cursor: "pointer" },
                    borderRadius: "8px",
                  }}
                >
                  Create +
                </Stack>
              </Stack>
              {mockData.map((item, index) => (
                <Stack
                  key={index}
                  sx={{
                    color: theme.palette.text.primary,
                    backgroundColor: "common.white",
                    mt: "1px",
                    borderRadius:
                      mockData.length === 1
                        ? "8px"
                        : index === 0
                        ? "8px 8px 0px 0px"
                        : index === mockData.length - 1
                        ? "0px 0px 8px 8px"
                        : "0px",
                  }}
                >
                  <OurPost
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </Stack>
              ))}
            </Stack>
          </Stack>
          {isMdUp && (
            <Stack
              sx={{
                width: 280,
                backgroundColor: theme.palette.background.default,
              }}
            ></Stack>
          )}
        </Stack>
      </Stack>
      <DialogPostEdit open={openDialogPostEdit} onClose={handleEdit} />
      <DialogPostCreate open={openDialogPostCreate} onClose={handleCreate} />
      <DialogConfirmDelete open={openDialogPostDelete} onClose={handleDelete} />
    </Stack>
  );
}
