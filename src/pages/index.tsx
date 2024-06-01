import NavBar from "@/pages/component/NavBar";
import React from "react";
import SideBar from "./component/SideBar";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const theme = useTheme();

  return (
    <Stack direction="column" spacing={0}>
      <NavBar />
      <Stack direction="row" sx={{}}>
        <SideBar />
        <Stack
          sx={{
            width: "100%",
            backgroundColor: theme.palette.background.default,
            height: "94vh",
          }}
        >
          test
        </Stack>
      </Stack>
    </Stack>
  );
}
