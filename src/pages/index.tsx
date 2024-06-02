import NavBar from "@/pages/component/NavBar";
import React, { useEffect, useState } from "react";
import SideBar from "./component/SideBar";
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
import Post from "./component/Post";
import { useRouter } from "next/router";
import DialogPostCreate from "./component/DialogPostCreate";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [communityType, setCommunityType] = useState("Community");
  const [value, setValue] = useState("");
  const [openDialogPost, setOpenDialogPost] = useState<boolean>(false);
  const [postData, setPostData] = useState<any>([]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCommunityType(event.target.value);
  };
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleRedirectToDetail = (id: string) => {
    router.push(`/post-detail/${id}`);
  };

  const handleCreate = () => {
    setOpenDialogPost(!openDialogPost);
  };

  const getAllPost = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/blog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    setPostData(data?.data);
  };

  useEffect(() => {
    getAllPost();
  }, []);

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
                    autoComplete="off"
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        height: "40px",
                        borderRadius: "8px",
                        backgroundColor: theme.palette.background.default,
                        border: "1px solid white",
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
                  value={communityType}
                  onChange={handleChange}
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
                  ƒ{" "}
                  <MenuItem value="Community" sx={{ display: "none" }}>
                    Community
                  </MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="History">History</MenuItem>
                  <MenuItem value="Pets">Pets</MenuItem>
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
              {postData?.map((item: any, index: number) => (
                <Stack
                  key={index}
                  onClick={() => handleRedirectToDetail(item.id)}
                  sx={{
                    color: theme.palette.text.primary,
                    ":hover": { cursor: "pointer" },
                    backgroundColor: "common.white",
                    mt: "1px",
                    borderRadius:
                      postData.length === 1
                        ? "8px"
                        : index === 0
                        ? "8px 8px 0px 0px"
                        : index === postData.length - 1
                        ? "0px 0px 8px 8px"
                        : "0px",
                  }}
                >
                  <Post post={item} />
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

      <DialogPostCreate open={openDialogPost} onClose={handleCreate} />
    </Stack>
  );
}
