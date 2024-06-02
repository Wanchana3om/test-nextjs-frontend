import NavBar from "@/pages/component/NavBar";
import React, { useEffect, useState } from "react";
import SideBar from "../component/SideBar";
import {
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";
import DialogComment from "../component/DialogComment";
import { useRouter as useRouterNextRouter } from "next/router";
import { useRouter as useRouterNextNavigation } from "next/navigation";
import timeAgoCal from "../hook/timeAgoCal";

export default function DetailPage() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const routerQuerry = useRouterNextRouter();
  const { id } = routerQuerry.query;
  const router = useRouterNextNavigation();

  const [openTextField, setOpenTextField] = useState<boolean>(false);
  const [openDialogComment, setOpenDialogComment] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>("");
  const [postData, setPostData] = useState<any>(null);

  const handleBackForward = () => {
    router.back();
  };

  const handleOpenTextField = () => {
    if (!isMdUp) {
      setInputComment("");
      setOpenDialogComment(!openTextField);
    }

    setInputComment("");
    setOpenTextField(!openTextField);
  };

  const mockData = [1, 3];

  const getPostById = async (id: string) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/blog/` + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setPostData(data?.data);
  };

  useEffect(() => {
    if (id) {
      const postId = Array.isArray(id) ? id[0] : id;
      getPostById(postId);
    }
  }, [id]);

  return (
    <Stack direction="column" spacing={0}>
      <NavBar />
      <Stack direction="row">
        <SideBar />
        <Stack
          direction="row"
          sx={{
            width: "100%",
            backgroundColor: "common.white",
          }}
        >
          <Stack
            sx={{
              width: "100%",
              height: "100vh",
              backgroundColor: "common.white",
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                width: "90%",
                backgroundColor: "common.white",
                mt: 4.5,
              }}
            >
              <Stack>
                <Stack
                  onClick={handleBackForward}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <Image
                    src="/icon/arrow-left.svg"
                    alt="search"
                    width={44}
                    height={44}
                  />
                </Stack>
                <Stack direction="row" sx={{ alignItems: "center", mt: 5 }}>
                  <AccountCircle sx={{ fontSize: 48 }} />
                  <Typography
                    sx={{
                      ml: "10px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {postData?.user.username}
                  </Typography>
                  <Typography
                    sx={{
                      ml: "10px",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: theme.palette.custom.base300,
                    }}
                  >
                    {timeAgoCal(postData?.createdAt)}
                  </Typography>
                </Stack>
                <Stack>
                  <Box
                    sx={{
                      mt: 0.5,
                    }}
                  >
                    <Chip
                      label="History"
                      size="small"
                      className="customChipWidth"
                      sx={{
                        fontSize: 10,
                        fontWeight: 400,
                        color: "#4A4A4A",
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {postData?.title}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: 400,
                      fontSize: "12px",
                      color: theme.palette.text.primary,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-word",
                    }}
                  >
                    {postData?.content}
                  </Typography>
                  <Stack direction="row" sx={{ alignItems: "center", mt: 3.5 }}>
                    <Stack>
                      <Image
                        src="/icon/message.svg"
                        alt="message-icon"
                        width={16}
                        height={16}
                      />
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 400,
                        ml: "5px",
                        color: theme.palette.custom.base300,
                      }}
                    >
                      {postData?.comments.length || 0} Comments
                    </Typography>
                  </Stack>

                  {openTextField ? (
                    <Stack>
                      <TextField
                        name="textValue"
                        rows={4}
                        multiline
                        value={inputComment || ""}
                        onChange={(e) => setInputComment(e.target.value)}
                        sx={{
                          mt: "20px",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                          },
                        }}
                        placeholder="What’s on your mind..."
                        aria-describedby="url"
                      />
                      <Stack
                        direction="row"
                        sx={{ mt: 1.25, justifyContent: "end" }}
                      >
                        <Button
                          onClick={handleOpenTextField}
                          sx={{
                            fontWeight: "600",
                            fontSize: "0.875rem",
                            color: theme.palette.success.main,
                            border: `1px solid ${theme.palette.success.main}`,
                            borderRadius: "8px",
                            width: 105,
                            textTransform: "none",
                            mr: 1.5,
                            backgroundColor: "transparent",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleOpenTextField}
                          sx={{
                            fontWeight: "600",
                            fontSize: "0.875rem",
                            color: theme.palette.custom.white,
                            border: `1px solid ${theme.palette.success.main}`,
                            borderRadius: "8px",
                            width: 105,
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
                    </Stack>
                  ) : (
                    <Button
                      onClick={handleOpenTextField}
                      sx={{
                        fontWeight: "600",
                        fontSize: "0.875rem",
                        color: theme.palette.success.main,
                        border: `1px solid ${theme.palette.success.main}`,
                        borderRadius: "8px",
                        width: 132,
                        textTransform: "none",
                        mt: 4,
                        backgroundColor: "transparent",
                      }}
                    >
                      Add Comment
                    </Button>
                  )}
                </Stack>

                {postData?.comments?.map((item: any, index: number) => (
                  <Stack
                    key={index}
                    sx={{
                      color: theme.palette.text.primary,
                      backgroundColor: "common.white",
                      mt: "1px",
                    }}
                  >
                    <Stack direction="row" sx={{ alignItems: "center", mt: 5 }}>
                      <AccountCircle sx={{ fontSize: 40 }} />
                      <Typography
                        sx={{
                          ml: "10px",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {item?.user.username}
                      </Typography>
                      <Typography
                        sx={{
                          ml: "10px",
                          fontSize: "12px",
                          fontWeight: 400,
                          color: theme.palette.custom.base300,
                        }}
                      >
                        {timeAgoCal(item?.createdAt)}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography
                        sx={{
                          mt: 1,
                          ml: "50px",
                          fontWeight: 400,
                          fontSize: "12px",
                          color: theme.palette.text.primary,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          wordBreak: "break-word",
                        }}
                      >
                        {item?.message}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <DialogComment open={openDialogComment} onClose={handleOpenTextField} />
    </Stack>
  );
}
