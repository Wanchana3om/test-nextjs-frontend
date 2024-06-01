import React from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SideBar() {
  const theme = useTheme();
  const router = useRouter();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleRedirectToHome = () => {
    router.push("/");
  };

  const handleRedirectToOurBlog = () => {
    router.push(`/our-blog`);
  };

  return (
    isMdUp && (
      <Box
        sx={{
          width: 280,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box sx={{ marginTop: 4 }}>
          <Stack
            direction="row"
            sx={{
              ml: 3.5,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={handleRedirectToHome}
          >
            <Stack>
              <Image
                src="/icon/home-line.svg"
                alt="home-icon"
                width={24}
                height={24}
              />
            </Stack>
            <Typography
              sx={{
                ml: 1.5,
                fontWeight: 500,
                color: theme.palette.primary.main,
              }}
            >
              Home
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              ml: 3.5,
              mt: 2,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={handleRedirectToOurBlog}
          >
            <Stack>
              <Image src="/icon/edit.svg" alt="logo" width={24} height={24} />
            </Stack>
            <Typography
              sx={{
                ml: 1.5,
                fontWeight: 500,
                color: theme.palette.primary.main,
              }}
            >
              Our Blog
            </Typography>
          </Stack>
        </Box>
      </Box>
    )
  );
}
