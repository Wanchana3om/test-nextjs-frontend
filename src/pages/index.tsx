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
import { useQuery } from "react-query";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [communityType, setCommunityType] = useState<string>("All");
  const [inputSearch, setInputSearch] = useState<string>("");
  const [openDialogPost, setOpenDialogPost] = useState<boolean>(false);
  const [inputCreatePost, setInputCreatePost] = useState<string>("");
  const [inputTitleCreatePost, setInputTitleCreatePost] = useState<string>("");
  const [communityTypeCreatePost, setCommunityTypeCreatePost] =
    useState<string>("All");
  const [communityTypeEmpty, setCommunityTypeEmpty] = useState<boolean>(false);
  const [titleEmpty, setTitleEmpty] = useState<boolean>(false);
  const [contentEmpty, setContentEmpty] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCommunityType(event.target.value);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };

  const handleRedirectToDetail = (id: string) => {
    router.push(`/post-detail/${id}`);
  };

  const handleOpenDialogCreate = () => {
    setInputCreatePost("");
    setInputTitleCreatePost("");
    setCommunityTypeCreatePost("All");
    setCommunityTypeEmpty(false);
    setContentEmpty(false);
    setTitleEmpty(false);
    setOpenDialogPost(!openDialogPost);
  };

  useEffect(() => {
    setTitleEmpty(false);
    setContentEmpty(false);
    setCommunityTypeEmpty(false);
  }, [inputTitleCreatePost, inputCreatePost, communityTypeCreatePost]);

  const fetchAllPosts = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/blog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    return data?.data;
  };

  const {
    data: postData,
    isLoading,
    refetch,
  } = useQuery("allPosts", fetchAllPosts);

  const filteredPosts = postData?.filter((post: any) => {
    const matchesSearch =
      post.title.toLowerCase().includes(inputSearch.toLowerCase()) ||
      post.content.toLowerCase().includes(inputSearch.toLowerCase());
    const matchesCommunityType =
      communityType === "All" || post.communityType === communityType;
    return matchesSearch && matchesCommunityType;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    setContentEmpty(false);
    setTitleEmpty(false);
    setOpenDialogPost(false);
    setCommunityType("All")
    setInputSearch("")

    refetch();
  };

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
                    value={inputSearch}
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
                  onClick={handleOpenDialogCreate}
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
                  onClick={() => handleRedirectToDetail(item.id)}
                  sx={{
                    color: theme.palette.text.primary,
                    ":hover": { cursor: "pointer" },
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

      <DialogPostCreate
        open={openDialogPost}
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
    </Stack>
  );
}
