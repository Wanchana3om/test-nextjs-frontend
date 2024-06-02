import NavBar from "@/pages/component/NavBar";
import React, { useEffect, useState } from "react";
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
import DialogConfirmDelete from "../component/DialogConfirmDelete";
import { useQuery } from "react-query";

export default function OurBlogPage() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [communityType, setCommunityType] = useState<string>("All");
  const [value, setValue] = useState<string>("");
  const [selectDelete, setSelectDelete] = useState<number>(0);
  const [selectEdit, setSelectEdit] = useState<number>(0);
  const [openDialogPostDelete, setOpenDialogPostDelete] =
    useState<boolean>(false);
  const [openDialogPostCreate, setOpenDialogPostCreate] =
    useState<boolean>(false);
  const [inputCreatePost, setInputCreatePost] = useState<string>("");
  const [inputTitleCreatePost, setInputTitleCreatePost] = useState<string>("");
  const [communityTypeCreatePost, setCommunityTypeCreatePost] =
    useState<string>("All");
  const [communityTypeEmpty, setCommunityTypeEmpty] = useState<boolean>(false);
  const [inputEditPost, setInputEditPost] = useState<string>("");
  const [inputTitleEditPost, setInputTitleEditPost] = useState<string>("");
  const [communityTypeEditPost, setCommunityTypeEditPost] =
    useState<string>("All");
  const [openDialogPostEdit, setOpenDialogPostEdit] = useState<boolean>(false);
  const [titleEmpty, setTitleEmpty] = useState<boolean>(false);
  const [contentEmpty, setContentEmpty] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCommunityType(event.target.value);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleDialogEdit = (id?: number) => {
    setSelectEdit(id ?? 0);
    handleOpenDialogEdit(id ?? 0);
  };

  const handleCreate = () => {
    setOpenDialogPostCreate(!openDialogPostCreate);
  };

  const handleDialogDelete = (id?: number) => {
    setSelectDelete(id ?? 0);
    setOpenDialogPostDelete(!openDialogPostDelete);
  };

  const handleDelete = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const deletePost = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/blog/post",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          postId: selectDelete,
        }),
      }
    );

    if (deletePost) {
      refetch();
      setOpenDialogPostDelete(!openDialogPostDelete);
    }
  };

  const fetchOurPosts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/blog/our-blog/" + userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();

    return data?.data;
  };

  const handleOnPost = async () => {
    if (communityTypeCreatePost === "All") {
      setCommunityTypeEmpty(true);
      return;
    }

    if (!inputTitleCreatePost) {
      setTitleEmpty(true);
      return;
    }

    if (!inputCreatePost) {
      setContentEmpty(true);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    await fetch(process.env.NEXT_PUBLIC_API_URL + `/blog/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        title: inputTitleCreatePost,
        content: inputCreatePost,
        communityType: communityTypeCreatePost,
      }),
    });

    setInputCreatePost("");
    setInputTitleCreatePost("");
    setCommunityTypeCreatePost("All");
    setCommunityTypeEmpty(false);
    setOpenDialogPostCreate(false);
    setTitleEmpty(false);
    setContentEmpty(false);
    setCommunityType("All");
    setValue("");

    refetch();
  };

  const handleOnEdit = async () => {
    if (!inputTitleEditPost) {
      setTitleEmpty(true);
      return;
    }

    if (!inputEditPost) {
      setContentEmpty(true);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    await fetch(process.env.NEXT_PUBLIC_API_URL + `/blog/post`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        postId: selectEdit,
        title: inputTitleEditPost,
        content: inputEditPost,
        communityType: communityTypeEditPost,
      }),
    });

    setInputEditPost("");
    setInputTitleEditPost("");
    setCommunityTypeEditPost("All");
    setOpenDialogPostEdit(false);
    setTitleEmpty(false);
    setContentEmpty(false);

    refetch();
  };

  const handleOpenDialogEdit = async (id?: number) => {
    setTitleEmpty(false);
    setContentEmpty(false);

    const accessToken = localStorage.getItem("accessToken");

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/blog/` + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data } = await res.json();

    setInputEditPost(data?.content);
    setInputTitleEditPost(data?.title);
    setCommunityTypeEditPost(data?.communityType);

    setOpenDialogPostEdit(!openDialogPostEdit);
  };

  useEffect(() => {
    setTitleEmpty(false);
    setContentEmpty(false);
    setCommunityTypeEmpty(false);
  }, [inputTitleEditPost, inputEditPost]);

  const handleOpenDialogCreate = () => {
    setTitleEmpty(false);
    setContentEmpty(false);
    setCommunityTypeEmpty(false);
    setInputTitleCreatePost("");
    setInputCreatePost("");
    setCommunityTypeCreatePost("All");
    setOpenDialogPostCreate(!openDialogPostCreate);
  };

  const {
    data: postData,
    isLoading,
    refetch,
  } = useQuery("ourPosts", fetchOurPosts);

  const filteredPosts = postData?.filter((post: any) => {
    const matchesSearch =
      post.title.toLowerCase().includes(value.toLowerCase()) ||
      post.content.toLowerCase().includes(value.toLowerCase());
    const matchesCommunityType =
      communityType === "All" || post.communityType === communityType;
    return matchesSearch && matchesCommunityType;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                    autoComplete="off"
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
                  value={communityType || "All"}
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
                  <MenuItem value="All">Community</MenuItem>
                  <MenuItem value="History">History</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Pets">Pets</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Exercise">Exercise</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
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
              {filteredPosts?.map((item: any, index: number) => (
                <Stack
                  key={index}
                  sx={{
                    color: theme.palette.text.primary,
                    backgroundColor: "common.white",
                    mt: "1px",
                    borderRadius:
                      filteredPosts.length === 1
                        ? "8px"
                        : index === 0
                        ? "8px 8px 0px 0px"
                        : index === filteredPosts.length - 1
                        ? "0px 0px 8px 8px"
                        : "0px",
                  }}
                >
                  <OurPost
                    post={item}
                    handleEdit={() => handleDialogEdit(item.id)}
                    handleDelete={() => handleDialogDelete(item.id)}
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
      <DialogPostEdit
        open={openDialogPostEdit}
        onClose={handleDialogEdit}
        onClick={handleOnEdit}
        titleEmpty={titleEmpty}
        contentEmpty={contentEmpty}
        inputCreatePost={inputEditPost}
        inputTitleCreatePost={inputTitleEditPost}
        communityTypeCreatePost={communityTypeEditPost}
        setInputCreatePost={setInputEditPost}
        setInputTitleCreatePost={setInputTitleEditPost}
        setCommunityTypeCreatePost={setCommunityTypeEditPost}
      />
      <DialogPostCreate
        open={openDialogPostCreate}
        onClose={handleOpenDialogCreate}
        onClick={handleOnPost}
        titleEmpty={titleEmpty}
        contentEmpty={contentEmpty}
        communityTypeEmpty={communityTypeEmpty}
        inputCreatePost={inputCreatePost}
        inputTitleCreatePost={inputTitleCreatePost}
        communityTypeCreatePost={communityTypeCreatePost}
        setInputCreatePost={setInputCreatePost}
        setInputTitleCreatePost={setInputTitleCreatePost}
        setCommunityTypeCreatePost={setCommunityTypeCreatePost}
      />
      <DialogConfirmDelete
        open={openDialogPostDelete}
        onClose={handleDialogDelete}
        onClick={handleDelete}
      />
    </Stack>
  );
}
