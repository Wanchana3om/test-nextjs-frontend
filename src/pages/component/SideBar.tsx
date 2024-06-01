import React from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    isMdUp && (
      <Box
        sx={{
          width: 280,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box sx={{ marginTop: 4 }}>
          <Link href="/" passHref>
            <Stack direction="row" sx={{ ml: 3.5 }}>
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
          </Link>
          <Link href="our-blog" passHref>
            <Stack direction="row" sx={{ ml: 3.5, mt: 2 }}>
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
          </Link>
        </Box>
      </Box>
    )
  );
};

export default SideBar;
