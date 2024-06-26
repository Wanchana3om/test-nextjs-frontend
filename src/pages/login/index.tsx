import Image from "next/image";
import { Button, TextField, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../auth/authContext";

export default function LoginPage() {
  const { signIn } = useAuth();
  const [username, setUsername] = useState<string>("");
  const theme = useTheme();

  const handleSignIn = () => {
    signIn(username);
  };

  return (
    <Stack
      sx={{
        height: "100vh",
        backgroundColor: theme.palette.primary.main,
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
                color: theme.palette.custom.white,
              }}
            >
              Sign in
            </Typography>

            <TextField
              type="text"
              value={username}
              autoComplete="off"
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
              onClick={handleSignIn}
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                my: 2.5,
                textTransform: "none",
                height: 40,
                borderRadius: "8px",
                backgroundColor: theme.palette.success.main,
                color: theme.palette.custom.white,
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
                color: theme.palette.custom.white,
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
