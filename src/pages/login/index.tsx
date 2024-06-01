import Image from "next/image";
import { Button, TextField, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");

  return (
    <Stack
      sx={{
        height: "100vh",
        backgroundColor: "#243831",
      }}
    >
      <Stack
        flex={1}
        justifyContent="space-between"
        sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", md: "58%" },
            height: { xs: "58%", md: "100%" },
          }}
        >
          <Stack width={384}>
            <Typography
              sx={{
                fontFamily: "inter, sans-serif",
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              Sign in
            </Typography>

            <TextField
              type="text"
              value={username}
              placeholder={"Username"}
              aria-describedby="username"
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                sx: {
                  mt: 5,
                  height: "44px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                },
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                my: 2.5,
                textTransform: "none",
                height: 40,
                borderRadius: "8px",
                backgroundColor: "#49A569",
                color: "white",
                "&:hover": {
                  backgroundColor: "#2C5F44",
                },
              }}
            >
              เข้าสู่ระบบ
            </Button>
          </Stack>
        </Stack>

        <Stack
          flex={1}
          sx={{
            width: { xs: "100%", md: "42%" },
            height: { xs: "42%", md: "100%" },
            backgroundColor: "#2B5F44",
            borderRadius: { xs: "0 0 36px 36px", md: "36px 0 0 36px" },
          }}
        >
          <Stack flex={1} justifyContent="center" alignItems="center">
            <Image src="/stationery.svg" alt="logo" width={300} height={230} />

            <Typography
              sx={{
                mt: 2.5,
                fontFamily: "Castoro, serif",
                fontStyle: "italic",
                fontSize: 28,
              }}
            >
              a Board
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
